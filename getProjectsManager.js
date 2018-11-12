import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

    const data = event.pathParameters;
    const params = {
    TableName: "project_data",    
    //ProjectionExpression: "developers",
    FilterExpression: "contains(projectmanager, :id)",
    ExpressionAttributeValues: {
      ":id": data.id
    }
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result.Items); 
  } catch (e) {
    console.log(e);
    return failure({ status: false, error: e, event });
  }
}
