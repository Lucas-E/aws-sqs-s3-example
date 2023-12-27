// authService.test.ts
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DataSource, Repository } from "typeorm";
import { AuthService } from "../service/auth.service";
import { User } from "../entity/User";
import { AppDataSource } from '../data-source';

// Mocking the Repository class
jest.mock("typeorm", () => ({
  Repository: jest.fn().mockImplementation(() => ({
    findOne: jest.fn(),
  })),
}));

// Mocking bcrypt
jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

// Mocking jwt
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("AuthService", () => {
  let userRepositoryMock: Repository<User>;
  let authService: AuthService;

  beforeEach(() => {
    userRepositoryMock = new Repository<User>(User, AppDataSource.manager);
    authService = new AuthService(userRepositoryMock);
  });

  it("should authenticate user with correct credentials", async () => {
    const mockUser = new User();
    mockUser.id = 1;
    mockUser.email = "test@example.com";
    mockUser.password = "hashedPassword";

    (userRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
    (jwt.sign as jest.Mock).mockReturnValueOnce("mockedToken");

    const token = await authService.authenticate("test@example.com", "password");

    expect(token).toBe("mockedToken");
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        email: "test@example.com",
      },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUser.id, userEmail: mockUser.email },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 }
    );
  });

  it("should throw an error for invalid credentials", async () => {
    (userRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(authService.authenticate("nonexistent@example.com", "invalidPassword")).rejects.toThrow("User not found");
  });
});
