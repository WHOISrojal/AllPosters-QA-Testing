const { expect } = require("@playwright/test");
async function getCurrentDateTimeStamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");
  const second = now.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day}-${hour}-${minute}-${second}`;
}
async function authenticateUser1({ request }) {
  try {
    const apiUrl = "https://www.instant-gaming.com/en/";
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await request.post(apiUrl + "/users/login", {
      headers,
      data: {
        email: "rojal2002@gmail.com",
        password: "rojalinstantgaming10",
      },
    });
    const statusCode = response.status();
    if (statusCode !== 200) {
      console.error(`Unexpected status code: ${statusCode}`);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
      throw new Error("Authenetication Failed");
    }
    const responseBody = await response.json();
    console.Console.log("Authentication successful. Response body:",responseBody);
    return responseBody.token;
  } catch (error) {
    console.error("Error during authentication", error);
    throw error;
  }
}
async function createEntity(userData, accessToken, module, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: "Bearer " + accessToken,
    sig: "Automation",
    //'kbn-xsrf': 'true',
  };
  const response = await request.post(apiUrl + module, {
    headers,
    data: JSON.stringify(userData),
  });
  const responseBody = await response.json();
  const statusCode = response.status();
  expect(statusCode).toBe(201);
  if (responseBody && responseBody.id) {
    return responseBody.id;
  } else {
    return null;
  }
}
async function deleteEntity(accessToken, module, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: "Bearer " + accessToken,
  };
  const response = await request.delete(apiUrl + module, {
    headers,
  });
  console.log("#############" + JSON.stringify(response));
  const statusCode = response.status();
  expect(statusCode).toBe(200);
}

module.exports = {authenticateUser1, getCurrentDateTimeStamp, createEntity, deleteEntity};
