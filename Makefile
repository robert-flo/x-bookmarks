PORT ?= 8765

.DEFAULT_GOAL := help

.PHONY: help setup serve test build preview open

help:
	@echo "Flujo"
	@echo "  make setup    — bundle install"
	@echo "  make serve    — app Rails en http://127.0.0.1:$(PORT)/  (desarrollo)"
	@echo "  make test     — pruebas"
	@echo "  make build    — genera el estático en build/  (rake site:build)"
	@echo "  make preview  — sirve build/, igual que GitHub Pages"
	@echo "  make open     — abre http://127.0.0.1:$(PORT)/"
	@echo ""
	@echo "Puerto: PORT=9000 make serve"

setup:
	bundle check || bundle install

serve:
	bin/rails server -b 127.0.0.1 -p $(PORT)

test:
	bin/rails test

build:
	bin/rake site:build

preview: build
	python3 -m http.server $(PORT) --bind 127.0.0.1 --directory build

open:
	xdg-open http://127.0.0.1:$(PORT)/
