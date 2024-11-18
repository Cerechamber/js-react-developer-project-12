lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

deploy:
	git push

start:
	make start-backend

develop:
	make start-frontend & make start-backend

build:
	rm -rf frontend/dist
	npm run build