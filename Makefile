PORT ?= 8765

.PHONY: help serve preview open test build

help:
	@echo "make serve    — Rails en http://127.0.0.1:$(PORT)/"
	@echo "make build    — escribe el sitio estático en build/"
	@echo "make preview  — sirve build/ (lo que publicará Pages)"
	@echo "make open     — abre http://127.0.0.1:$(PORT)/"
	@echo "make test     — pruebas"
	@echo "PORT=9000 make serve  — cambia el puerto"

serve:
	bin/rails server -b 127.0.0.1 -p $(PORT)

build:
	bin/rake site:build

preview: build
	python3 -m http.server $(PORT) --bind 127.0.0.1 --directory build

open:
	xdg-open http://127.0.0.1:$(PORT)/

test:
	bin/rails test
