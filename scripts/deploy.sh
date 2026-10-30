#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "Ошибка: Docker не установлен. Установите Docker Desktop или Docker Engine." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Ошибка: требуется Docker Compose v2 (команда 'docker compose')." >&2
  exit 1
fi

if [ ! -f .env ]; then
  SECRET=$(node -e "process.stdout.write(require('crypto').randomBytes(48).toString('hex'))")
  printf 'AUTH_SECRET=%s\n' "$SECRET" > .env
  chmod 600 .env
  echo "Создан локальный секрет подписи сессий."
elif ! grep -q '^AUTH_SECRET=' .env; then
  SECRET=$(node -e "process.stdout.write(require('crypto').randomBytes(48).toString('hex'))")
  printf '\nAUTH_SECRET=%s\n' "$SECRET" >> .env
  echo "В существующее окружение добавлен секрет подписи сессий."
fi

echo "Сборка и запуск Контур 18…"
docker compose up --build -d

echo "Ожидание готовности приложения…"
ATTEMPT=0
until curl --fail --silent http://127.0.0.1:3000/api/health >/dev/null 2>&1; do
  ATTEMPT=$((ATTEMPT + 1))
  if [ "$ATTEMPT" -ge 45 ]; then
    echo "Приложение не прошло проверку готовности. Последние логи:" >&2
    docker compose logs --tail=80 app >&2
    exit 1
  fi
  sleep 2
done

echo "Контур 18 запущен: http://localhost:3000"
docker compose ps
