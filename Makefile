lint-frontend:
	make -C frontend lint

install-back:
	npm ci

install-front:
	make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

deploy:
	git push

develop:
	make start-frontend & make start-backend

build:
	npm run build