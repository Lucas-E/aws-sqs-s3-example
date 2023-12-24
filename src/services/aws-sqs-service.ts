import { SQSClient } from "@aws-sdk/client-sqs";
export function sqsClient(){
    const sqs = new SQSClient({apiVersion: '2023-24-12'});
    return sqs
}

export const sqsInstance = sqsClient();