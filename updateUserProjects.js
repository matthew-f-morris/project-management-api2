import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = (event.body)
    const params = {
    TableName: "USER_DATA",    
    Key: {
      userId: data.userId,
      email: data.email
    },
    UpdateExpression: "SET projectids = list_append(:projectids, :projectids)",
    ExpressionAttributeValues: {
      ":projectids": data.projectids || null,
    },
    ReturnValues:"ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true});     
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
