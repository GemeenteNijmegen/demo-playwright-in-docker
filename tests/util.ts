import { CreateTableCommand, DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import * as crypto from 'crypto';



export async function mockDynamoDbSession() {
  const client = new DynamoDBClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb-local:8000'
  });

  try {
    const createTableCommand = new CreateTableCommand({
      TableName: 'sessions',
      KeySchema: [
        { AttributeName: 'sessionid', KeyType: 'HASH' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'sessionid', AttributeType: 'S' },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    });
    await client.send(createTableCommand);
  }
  catch (err) {
    //console.error(err); 
    // pass
  }


  const hash = crypto.createHash('sha256').update('session-id').digest('base64');
  const command = new PutItemCommand({
    TableName: 'sessions',
    Item: {
      sessionid: { S: hash },
      data: {
        M: {
          'loggedin': { BOOL: true },
          'username': { S: 'test-user' },
        }
      }
    }
  });
  await client.send(command);


  const getItemCommand = new GetItemCommand({
    Key: {
      'sessionid': { S: hash },
    },
    TableName: 'sessions',
  });
  const item = await client.send(getItemCommand);
  console.log(item);

}