PORT ?= 8765

.PHONY: help serve open test

help:
	@echo "make serve  — Rails en http://127.0.0.1:$(PORT)/"
	@echo "make open   — abre esa URL en el navegador"
	@echo "make test   — pruebas de integración"
	@echo "PORT=9000 make serve  — cambia el puerto"

serve:
	bin/rails server -b 127.0.0.1 -p $(PORT)

open:
	xdg-open http://127.0.0.1:$(PORT)/

test:
	bin/rails test
