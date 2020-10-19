import { GET, POST, PUT, DELETE } from "./constants/RequestMethod.js";

class BaseServer {
  /**
   * API GET request.
   * @param {string} path
   * @param {callback} callback
   */
  get(path, callback) {
    this.route.routeStack.push({
      method: GET,
      path,
      callback,
    });
  }

  /**
   * API POST request
   * @param {string} path
   * @param {callback} callback
   */
  post(path, callback) {
    this.route.routeStack.push({
      method: POST,
      path,
      callback,
    });
  }

  /**
   * API PUT request
   * @param {string} path
   * @param {callback} callback
   */
  put(path, callback) {
    this.route.routeStack.push({
      method: PUT,
      path,
      callback,
    });
  }

  /**
   * API DELETE request
   * @param {string} path
   * @param {callback} callback
   */
  delete(path, callback) {
    this.route.routeStack.push({
      method: DELETE,
      path,
      callback,
    });
  }
}

export default BaseServer;
