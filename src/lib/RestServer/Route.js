class Route {
  /**
   * @constructor
   */
  constructor() {
    this.routeStack = [];
  }

  /**
   * Match request method and path.
   * @param {string} method - POST|GET|PUT|DELETE|PATCH
   * @param {string} path - api endpoint
   */
  match(method, path) {
    let routeMatch = false;
    let routeParams = {};

    for (let routeIdx = 0; routeIdx < this.routeStack.length; routeIdx++) {
      const route = this.routeStack[routeIdx];

      if (route.method === method) {
        const storedPath = route.path.split("/");
        const targetPath = path.split("/");

        if (storedPath.length !== targetPath.length) {
          continue;
        }

        routeParams = {};
        for (let segmentIdx = 0; segmentIdx < storedPath.length; segmentIdx++) {
          routeMatch = true;

          // check is route parameter variable
          if (storedPath[segmentIdx][0] === ":") {
            routeParams[storedPath[segmentIdx].slice(1)] =
              targetPath[segmentIdx];
            continue;
          }

          if (
            storedPath[segmentIdx].toLowerCase() !==
            targetPath[segmentIdx].toLowerCase()
          ) {
            routeMatch = false;
            break;
          }
        }

        if (routeMatch) {
          return {
            params: routeParams,
            callback: route.callback,
          };
        }
      }
    }

    return false;
  }
}

export default Route;
