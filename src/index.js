import bootstrap from "bootstrap.native";
import * as riot from "riot";
import HomeView from "./views/HomeView.riot";

riot.register('homeview', HomeView);
riot.mount('homeview');
