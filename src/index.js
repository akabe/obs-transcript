// Assets
import "./assets/images/obs-create-text-source.png";
import "./assets/images/obs-websocket-connection.png";

import bootstrap from "bootstrap.native"; // eslint-disable-line no-unused-vars
import * as riot from "riot";
import HomeView from "./views/HomeView.tag.html";

riot.register("homeview", HomeView);
riot.mount("homeview");
