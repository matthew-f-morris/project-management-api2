import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = (event.body)
    const params = {
    TableName: "user_data",    
    Key: {
      userId: data.userId
    },
    ProjectionExpression: "name",
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      return success(result.Item);     
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
