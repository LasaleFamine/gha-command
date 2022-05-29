#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const exec_1 = require("@actions/exec");
const output_listener_1 = require("./output-listener");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const runCommand = core.getInput('run');
    // Create listeners to receive output (in memory) as well
    const stdout = new output_listener_1.OutputListener();
    const stderr = new output_listener_1.OutputListener();
    const listeners = {
        stdout: stdout.listener,
        stderr: stderr.listener,
    };
    const options = {
        listeners,
        ignoreReturnCode: true,
    };
    const exitCode = yield (0, exec_1.exec)(runCommand, undefined, options);
    core.debug(`Command exited with code ${exitCode}.`);
    core.debug(`stdout: ${stdout.contents}`);
    core.debug(`stderr: ${stderr.contents}`);
    core.debug(`exitcode: ${exitCode}`);
    // Set outputs, result, exitcode, and stderr
    core.setOutput('stdout', stdout.contents);
    core.setOutput('stderr', stderr.contents);
    core.setOutput('exitcode', exitCode.toString(10));
    if (exitCode === 0) {
        return;
    }
    // A non-zero exitCode is considered an error
    core.setFailed(`Command exited with code ${exitCode}.`);
});
run().catch(error => core.setFailed(error.message));
