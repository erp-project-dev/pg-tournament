#!/usr/bin/env bash
# Baja la foto de perfil pública (og:image, 100x100) de cada usuario de Instagram
# a public/participants/<usuario>.webp. Uso: fetch-photos.sh usuario1 usuario2 ...
set -u
cd "$(git rev-parse --show-toplevel)"
mkdir -p public/participants
for u in "$@"; do
  url=$(curl -s -A "Mozilla/5.0" "https://www.instagram.com/$u/" \
    | grep -o 'og:image" content="[^"]*' | head -1 \
    | sed 's/og:image" content="//; s/&amp;/\&/g')
  if [ -z "$url" ]; then echo "FAIL $u"; sleep 2; continue; fi
  tmp=$(mktemp).jpg
  if curl -s "$url" -o "$tmp" && file -b "$tmp" | grep -q JPEG; then
    cwebp -quiet -q 82 "$tmp" -o "public/participants/$u.webp" && echo "OK   $u"
  else
    echo "FAIL $u"
  fi
  rm -f "$tmp"
  sleep 2
done
