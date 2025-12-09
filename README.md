
# Quest App (short)

What it is
- A small Express-based demo application used by the Quest project. It serves simple endpoints and is containerized.

Purpose
- Demonstrate the app runtime, container build, and CI image publish flow.

How to trigger
- Push to `main`: CI builds and scans the Docker image and pushes it to ECR (see repository Actions).
- For manual runs: `npm install` then `npm start` (or build the Docker image and run it locally).

Quick local commands
- Install and run locally:
	```bash
	cd quest-app
	npm ci
	npm start
	```
- Build and run container locally:
	```bash
	docker build -t quest-app:local .
	docker run -p 3000:3000 quest-app:local
	```

Basic things to know
- Environment: `PORT` (defaults to 3000), `SECRET_WORD` (used by one endpoint).
- CI: GitHub Actions builds on push and tags images with the commit SHA.
- Security: app includes basic hardening (security headers, rate limiting) and avoids shell injection.
