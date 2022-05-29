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
export declare class OutputListener {
    _buff: any[];
    constructor();
    get listener(): (data: any) => void;
    get contents(): string;
}
