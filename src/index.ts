#!/usr/bin/env node

import * as core from '@actions/core';
import { exec } from '@actions/exec';

import { OutputListener } from './output-listener';

const run = async () => {
  const runCommand = core.getInput('run');
  // Create listeners to receive output (in memory) as well
  const stdout = new OutputListener();
  const stderr = new OutputListener();
  const listeners = {
    stdout: stdout.listener,
    stderr: stderr.listener,
  };

  const options = {
    listeners,
    ignoreReturnCode: true,
  };

  const exitCode = await exec(runCommand, undefined, options);
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
};

run().catch(error => core.setFailed(error.message));
