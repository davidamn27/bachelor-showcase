#!/bin/zsh
cd "$(dirname "$0")"
open "http://127.0.0.1:5503/index.html"
python3 -m http.server 5503
