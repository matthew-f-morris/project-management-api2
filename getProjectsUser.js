import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import { callbackify } from "util";

export async function main(event, context) {
    const data = (event.body)
    const params = {
    TableName: "project_data",    
    //ProjectionExpression: "developers",
    FilterExpression: "contains(developers, :id)",
    ExpressionAttributeValues: {
         ":id": data.userId
    }
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result.Items); 
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
