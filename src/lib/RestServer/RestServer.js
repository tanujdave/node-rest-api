import http from "http";
import BaseServer from "./BaseServer.js";
import Route from "./Route.js";

class RestServer extends BaseServer {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.server = http.createServer();
    this.route = new Route();
    this.handleRequest();
  }

  /**
   * Handle API request
   */
  handleRequest() {
    this.server.on("request", (request, response) => {
      const { method, url: path, headers } = request;
      const matchedRoute = this.route.match(method.toUpperCase(), path);

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");

      if (!matchedRoute) {
        response.statusCode = 404;
        response.write(
          JSON.stringify({
            message: `request api endpoint '${path}' not found`,
          })
        );
        response.end();
      }

      response.json = function (jsonData) {
        return JSON.stringify(jsonData);
      };      

      this.parseRequestBody(request).then((postBody) => {
        request.params = matchedRoute.params;
        request.body = postBody;
        matchedRoute.callback(request, response).then((resp) => {
          response.write(resp);
          response.end();
        });
      });
    });
  }

  /**
   * Parse request post data.
   * @param {http.request} request
   */
  parseRequestBody(request) {
    let body = [];
    return new Promise((resolve, reject) => {
      request
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          if (body.length < 1) {
            resolve(body);
            return;
          }
          resolve(JSON.parse(Buffer.concat(body).toString()));
        });
    });
  }
}

export default RestServer;
