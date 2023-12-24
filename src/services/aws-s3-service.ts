import { S3Client } from "@aws-sdk/client-s3"

export const s3Instance = new S3Client({ region: "us-east-2" })