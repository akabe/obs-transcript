export default class {
  constructor() {
  }

  isSupported() {
    return !!(webkitSpeechRecognition || SpeechRecognition);
  }

  start(lang, onresult) {
    return new Promise((resolve, reject) => {
      if (webkitSpeechRecognition) {
        this.engine = new webkitSpeechRecognition();
      } else if (SpeechRecognition) {
        this.engine = new SpeechRecognition();
      }

      this.engine.lang = lang;
      this.engine.continuous = true;
      this.engine.interimResults = true;
      this.engine.maxAlternatives = 1;

      this.engine.onstart = resolve;
      this.engine.onend = (event) => {
        if (this.isRunning) this.engine.start();
      };
      this.engine.onerror = reject;
      this.engine.onresult = (event) => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          onresult({
            'isFinal': event.results[i].isFinal,
            'transcript': event.results[i][0].transcript,
            'confidence': event.results[i][0].confidence,
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
