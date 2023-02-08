# Manga Downloader CLI

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U6IC8UC)

A command line interface (CLI) tool to download mangas chapters from the internet and join them into a single PDF file. This CLI works on macOS, Linux, and Windows 

&nbsp;

[![Download for MacOS](https://drive.google.com/uc?id=1kOuYNOrlNFIVE2NcQpdvyfhHRmXDQ8A1)](https://github.com/gpuente/manga-tools/releases/download/v1.0.0/manga-cli-macos-1.0.0) &numsp;&numsp; [![Download for Windows](https://drive.google.com/uc?id=10D6M-ZiYxO58JVu3p4FNkWCVBk8uXNQ7)](https://github.com/gpuente/manga-tools/releases/download/v1.0.0/manga-cli-win-1.0.0.exe) &numsp;&numsp; [![Download for Linux](https://drive.google.com/uc?id=1kypzNOiAzgXG3TS4TmHkyxxlSCwF15Vh)](https://github.com/gpuente/manga-tools/releases/download/v1.0.0/manga-cli-linux-1.0.0)

&nbsp;

![](https://drive.google.com/uc?id=14bs3m1MwDT8MMyhc0r_BVZstIpCabhDv)

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
