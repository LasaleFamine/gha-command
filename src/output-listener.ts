/**
 * Acts as a listener for @actions/exec, by capturing STDOUT and STDERR
 * streams, and exposing them via a contents attribute.
 *
 * @example
 * // Instantiate a new listener
 * const listener = new OutputListener();
 * // Register listener against STDOUT stream
 * await exec.exec('ls', ['-ltr'], {
 *  listeners: {
 *    stdout: listener.listener
 *  }
 * });
 * // Log out STDOUT contents
 * console.log(listener.contents);
 */
export class OutputListener {
  _buff: any[];
  constructor() {
    this._buff = [];
  }

  get listener() {
    const listen = (data: any) => {
      this._buff.push(data);
    };
    return listen.bind(this);
  }

  get contents() {
    return this._buff
      .map(chunk => chunk.toString())
      .join('');
  }
}

