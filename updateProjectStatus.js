import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

    const data = (event.body)
    const params = {
    TableName: "project_data",    
    Key: {
      project_id: data.project_id,
    },
    UpdateExpression: "SET projectstatus = :status",
    ExpressionAttributeValues: {
      ":status": data.projectstatus,
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
