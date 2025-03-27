import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: "eu-north-1",
    credentials: {
        accessKeyId: 'AKIA47CRWUSZGS7LPWNB',
        secretAccessKey: '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'
    }
})

const docClient = DynamoDBDocumentClient.from(client);

export { docClient, PutCommand };