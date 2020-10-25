export default class {
  constructor() {
  }

  isSupported() {
    return !!(webkitSpeechRecognition || SpeechRecognition);
  }

  start(lang, onresult) {
    return new Promise((resolve) => {
      if (webkitSpeechRecognition) {
        this.engine = new webkitSpeechRecognition();
      } else if (SpeechRecognition) {
        this.engine = new SpeechRecognition();
      }

      this.engine.lang = lang;
      this.engine.continuous = true;
      this.engine.interimResults = true;
      this.engine.maxAlternatives = 1;

      const model = this;

      this.engine.onstart = () => {
        console.log("Speech recognition started.");
        resolve();
      };
      this.engine.onend = () => {
        console.log("Speech recognition stopped.");
        if (model.engine) model.engine.start();
      };
      this.engine.onerror = (event) => {
        console.log("Speech recognition stopped by error: ", event);
        if (model.engine) model.engine.start();
      };
      this.engine.onresult = (event) => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          onresult({
            "isFinal": event.results[i].isFinal,
            "transcript": event.results[i][0].transcript,
            "confidence": event.results[i][0].confidence,
          });
        }
      };

      this.engine.start();
    });
  }

  stop() {
    if (this.engine) {
      this.engine.stop();
      this.engine = null;
    }
  }
}
