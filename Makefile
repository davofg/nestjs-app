### Default environment is development
ENV ?= development

### Load .env.<ENV> into environment variables
include .env.$(ENV)
export $(shell sed 's/=.*//' .env.$(ENV))

### Compose

up:
	@echo "Starting Docker Compose in <$(ENV)> mode"
	NODE_ENV=$(ENV) docker compose up -d

start:
	docker compose exec nestjs-app npx nest start --watch

down:
	docker compose down

dev:
	$(MAKE) ENV=development up

prod:
	$(MAKE) ENV=production up


### Database

# Run pending migrations
migrations-migrate:
	docker compose exec nestjs-app npx typeorm migration:run --dataSource ormconfig.ts

# Create an empty migration. Usage: make migrations-create name=your_migration_name
migrations-create:
	@if [ -z "$(name)" ]; then \
		echo "❌ You must provide a migration name. Usage: make migrations-create name=create-product-table"; \
		exit 1; \
	else \
		docker compose exec nestjs-app npx typeorm migration:create migrations/$(name); \
	fi

# Generate a new migration. Usage: make migrations:generate name=your_migration_name
migrations-generate:
	@if [ -z "$(name)" ]; then \
		echo "❌ You must provide a migration name. Usage: make migrations:generate name=create-product-table"; \
		exit 1; \
	else \
		docker compose exec nestjs-app npx typeorm migration:generate migrations/$(name) --dataSource ormconfig.ts; \
	fi

# Revert N migrations (default: 1)
migrations-revert:
	@if [ -z "$(N)" ]; then \
		echo "Reverting 1 migration..."; \
		docker compose exec nestjs-app npx typeorm migration:revert --dataSource ormconfig.ts; \
	else \
		echo "Reverting $(N) migrations..."; \
		for i in $(shell seq 1 $(N)); do \
			docker compose exec nestjs-app npx typeorm migration:revert --dataSource ormconfig.ts || break; \
		done; \
	fi