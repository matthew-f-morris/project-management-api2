import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

    const data = event.pathParameters;
    const params = {
    TableName: "project_data",    
    Key: {
      project_id: data.id
    },
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    return success({ status: true });     
  } catch (e) {
    console.log(e);
    return failure({ status: false, error: e, event });
  }
}