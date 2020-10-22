import OBSWebSocket from "obs-websocket-js";

export default class {
  constructor() {
    this.websocket = new OBSWebSocket();
  }

  connect(connInfo) {
    return this.websocket.connect(connInfo);
  }

  disconnect() {
    return this.websocket.disconnect();
  }

  setText(sourceType, sourceName, text) {
    if (sourceType == 0) {
      return this.setTextGDIPlus(sourceName, text);
    } else {
      return this.setTextFreetype2(sourceName, text);
    }
  }

  setTextGDIPlus(sourceName, text) {
    return this.websocket.send("SetTextGDIPlusProperties",
                               {
                                 "source": sourceName,
                                 "text": text
                               });
  }

  setTextFreetype2(sourceName, text) {
    return this.websocket.send("SetTextFreetype2Properties",
                               {
                                 "source": sourceName,
                                 "text": text
                               });
  }
}
