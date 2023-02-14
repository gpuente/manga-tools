# Manga Downloader CLI

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U6IC8UC)

A command line interface (CLI) tool to download mangas chapters from the internet and join them into a single PDF file. This CLI works on macOS, Linux, and Windows 

&nbsp;

[![Download for MacOS](https://raw.githubusercontent.com/gpuente/manga-tools/master/assets/img/macos.png)](https://github.com/gpuente/manga-tools/releases/download/v1.0.2/manga-cli-macos-1.0.2) &numsp;&numsp; [![Download for Windows](https://raw.githubusercontent.com/gpuente/manga-tools/master/assets/img/windows.png)](https://github.com/gpuente/manga-tools/releases/download/v1.0.2/manga-cli-win-1.0.2.exe) &numsp;&numsp; [![Download for Linux](https://raw.githubusercontent.com/gpuente/manga-tools/master/assets/img/linux.png)](https://github.com/gpuente/manga-tools/releases/download/v1.0.2/manga-cli-linux-1.0.2)

&nbsp;

![](https://raw.githubusercontent.com/gpuente/manga-tools/master/assets/img/cli.gif)

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
- `-c, --clear-cache`: Clear cache.
- `--clear-after-download`: Clears the cache after the download finishes.
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
