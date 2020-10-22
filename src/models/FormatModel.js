export default class {

  /**
   * Formats a given string.
   */
  format(strs, maxRows, maxCols) {
    const lines = strs.map(s => this.splitlines(s, maxCols)).flat();
    return lines.slice(Math.max(0, lines.length - maxRows)).join("\n");
  }

  /**
   * Splits a given string into lines of maximum length `maxCols`.
   */
  splitlines(str, maxCols) {
    let lines = [];
    let currLine = "";

    str.split(/ /).forEach(wd => {
      if (currLine.length == 0) {
        lines = this.splitcharwise(lines, wd, maxCols);
        currLine = lines.pop();
      } else {
        const newLine = currLine + " " + wd;

        if (newLine.length <= maxCols) {
          currLine = newLine;
        } else if (wd.length <= maxCols) {
          lines.push(currLine);
          currLine = wd;
        } else {
          lines = this.splitcharwise(lines, newLine, maxCols);
          currLine = lines.pop();
        }
      }
    });

    if (currLine.length > 0) {
      lines.push(currLine);
    }

    return lines;
  }

  /**
   * Splits a given string into substrings of maximum length `maxCols`,
   * and appends the substrings into `lines`.
   */
  splitcharwise(lines, str, maxCols) {
    while (str.length > maxCols) {
      lines.push(str.substring(0, maxCols));
      str = str.substring(maxCols);
    }

    if (str.length > 0) {
      lines.push(str);
    }

    return lines;
  }
}
