PORT ?= 8765

.PHONY: help serve open

help:
	@echo "make serve  — servidor local en http://127.0.0.1:$(PORT)/"
	@echo "make open   — abre esa URL en el navegador"
	@echo "PORT=9000 make serve  — cambia el puerto"

serve:
	python3 -m http.server $(PORT) --bind 127.0.0.1

open:
	xdg-open http://127.0.0.1:$(PORT)/
