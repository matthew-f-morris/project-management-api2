import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

    const data = JSON.parse(event.body)
    const params = {
    TableName: "project_data",    
    Key: {
      project_id: data.project_id,
    },
    UpdateExpression: "SET projectstatus = :status, projectname = :name, projectmanager = :manager, projectdescription = :description, developers = :devs",
    ExpressionAttributeValues: {
      ":status": data.projectstatus,
      ":name": data.projectname,
      ":manager": data.projectmanager,
      ":description": data.projectdescription,
      ":devs": data.developers
    },
    ReturnValues:"ALL_NEW"
  };    

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true});     
  } catch (e) {
    console.log(e);
    return failure({ status: false, error: e });
  }
}
