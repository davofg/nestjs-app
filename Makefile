# Default environment is development
ENV ?= development

up:
	@echo "Starting Docker Compose in $(ENV) mode"
	NODE_ENV=$(ENV) docker compose up --build

down:
	docker compose down

dev:
	$(MAKE) ENV=development up

prod:
	$(MAKE) ENV=production up
