# Manga Downloader CLI

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U6IC8UC)

A command line interface (CLI) project to download manga chapters from the internet and join them into a single PDF file. This CLI works on macOS, Linux, and Windows


![](https://drive.google.com/uc?id=1rBUKryf7JsUnsm3FyBFSe5RO2K76gFlR)

## Features:

- Download mangas in Spanish language only (support for more languages will be added in the future).
- CLI supports both English and Spanish languages (use --lang=es for Spanish or --lang=en for English).
- Debug mode
- Cache

Usage:
```
manga-cli [OPTIONS]
```

## Options:
- `-h, --help`: Show this message and exit.
- `-c, --clear-cache`: Clear cache after the download finishes.
- `-s, --skip-open`: Avoid open the generated pdf after download completes.
- `-d, --debug`: Enable the debug mode.
- `--lang [es|en]`:  Language for the CLI, either Spanish (es) or English (en). Default is English.

## Example:
Starts the cli assistant:
```bash
  manga-cli
```


Starts the cli assistant in spanish:
```bash
  manga-cli --lang=es
```

### Note:
This project only supports downloading manga in Spanish language at the moment.
