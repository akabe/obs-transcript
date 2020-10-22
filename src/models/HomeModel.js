import UAParser from "ua-parser-js";
import OBSRepository from "../repositories/OBSRepository.js";
import SpeechRecognitionModel from "../models/SpeechRecognitionModel.js";
import FormatModel from "../models/FormatModel.js";

export default class {
  constructor() {
    this.obsRepository = new OBSRepository();
    this.uaParser = new UAParser();
    this.speechRecognitionModel = new SpeechRecognitionModel();
    this.formatModel = new FormatModel();

    this.lang = this.getDefaultLanguage();
    this.websocketAddress = "localhost:4444";
    this.websocketPassword = null;
    this.sourceName = "my_transcript_src";
    this.sourceType = this.getDefaultSourceType();
    this.maxRows = 3;
    this.maxCols = 20;
    this.fixedTranscripts = [];
  }

  isSupported() {
    return this.speechRecognitionModel.isSupported();
  }

  getDefaultLanguage() {
    return (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ||
      window.navigator.userLanguage ||
      window.navigator.browserLanguage || "en";
  }

  getDefaultSourceType() {
    const os = this.uaParser.getOS();
    return os.name === "Windows" ? 0 : 1;
  }

  start() {
    return this.obsRepository
      .connect({
        address: this.websocketAddress,
        password: this.websocketPassword
      }).then(() =>
        this.obsRepository
          .setText(this.sourceType, this.sourceName, "") // Validates sourceType and sourceName
          .then(() =>
            this.speechRecognitionModel.start(this.lang, (event) => {
              console.log(event);

              let transcripts;
              if (event.isFinal) {
                this.fixedTranscripts.push(event.transcript);
                transcripts = this.fixedTranscripts;
              } else {
                transcripts = [...this.fixedTranscripts, event.transcript];
              }

              const text = this.formatModel.format(transcripts, this.maxRows, this.maxCols);
              this.obsRepository.setText(this.sourceType, this.sourceName, text);
            }))
          .catch(err => {
            this.stop(); // close connection if failed.
            throw err;
          }));
  }

  stop() {
    this.speechRecognitionModel.stop();
    this.obsRepository.disconnect();
  }
}
