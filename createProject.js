import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = (event.body);
  const params = {
    TableName: "project_data",
    Item: {
      project_id: uuid.v1(),
      developers: data.developers,
      projectdescription: data.projectdescription,
      projectmanager: data.projectmanager,
      projectname: data.projectname,
      projectstatus: data.projectstatus
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}



