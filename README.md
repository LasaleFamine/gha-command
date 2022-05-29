
# GitHub Action Command Output

> Run a shell command and expose its output

## Inputs

### `run`

**Required** Command to run.

## Outputs

### `stdout`

The output of the command written to stdout.

### `stderr`

The output of the command written to stderr.

## Example usage

#### Store today's date in variable

```yaml
steps:
- name: Run a command
  uses: lasalefamine/gha-command@v1
  id: custom_command
  with:
    run: ./some-script.sh # or everything else

- run: echo Output - ${{ steps.custom_command.outputs.stdout }}
```

