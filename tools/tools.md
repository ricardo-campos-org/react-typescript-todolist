# Tools

All kind of tools and useful links and commands can be found here!

## Links

- **GitHub Container Registry:** https://ghcr.io/
- **Time tracking:** https://track.toggl.com/timer

## Building locally

**Tasknote-web - Frontend Web App:**

Before building, you need define some env vars:

```bash
export VITE_BUILD=<branch-name-and-PR-number>
```

Then you can call the install and build scripts (from the `client` folder):

```bash
npm ci --ignore-scripts --no-update-notifier --omit=dev \
 && npm run build \
 && rm -rf node_modules
```

If you want to build with Docker:
```bash
docker build --no-cache \
 --build-arg VITE_BUILD="v999-$(date '+%Y-%m-%d-%H%M%S')" \
 --build-arg SOURCE_PR="v999-123456789-$(date '+%Y-%m-%d-%H%M%S')" \
 -t tasknote-web:candidate \
 ./client
```

That's it!

**Tasknote-api - Backend REST API:**

For the backend there's a Dockerfile ready, just run (from the project root):

```bash
docker build --no-cache \
 --build-arg BUILD="v999-$(date '+%Y-%m-%d-%H%M%S')" \
 --build-arg SOURCE_PR="v999-123456789-$(date '+%Y-%m-%d-%H%M%S')" \
 -t tasknote-api:candidate \
 ./server
```

That's it!

## Running with Docker

**DB:**

```bash
docker run -d -p 5432:5432 --rm \
  --name db \
  -e POSTGRES_DB=$POSTGRES_DB \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  postgres:15.8-bookworm
```

**Tasknote-api:**

```bash
docker run -d -p 8585:8585 --rm \
  --name tasknote-api \
  -e POSTGRES_DB=$POSTGRES_DB \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_PORT=$POSTGRES_PORT \
  -e POSTGRES_HOST=$POSTGRES_HOST \
  -e CORS_ALLOWED_ORIGINS=$CORS_ALLOWED_ORIGINS \
  ghcr.io/ricardo-campos-org/react-typescript-todolist/tasknote-api:<PR-Number>
```

Build Cloud Native: `./mvnw -B package -Pnative -DskipTests`

**Tasknote-web:**

The frontend app will run on Nginx.

## Interacting with GitHub Package and Container Registry

**Login in:**

```
export CR_PAT=YOUR_TOKEN
echo $CR_PAT | docker login ghcr.io -u RMCampos --password-stdin
```

**Pulling images:**

```sh
docker pull ghcr.io/ricardo-campos-org/react-typescript-todolist/tasknote-web:50
docker pull ghcr.io/ricardo-campos-org/react-typescript-todolist/tasknote-api:50
```

**Pushing images:**
```sh
docker push ghcr.io/ricardo-campos-org/react-typescript-todolist/tasknote-api:316
```

- Get container IP

```sh
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db
```

- Get reason of health check failing on a container
```sh
docker inspect --format "{{json .State.Health}}" container_name_or_id | jq

# Or to see it live
while true; do clear; docker inspect --format "{{json .State.Health}}" tasknote-api | jq; sleep 1; done
```

- Extract Env value from docker image (without running)
```bash
docker inspect tasknote-web:candidate | jq -r '.[0].Config.Env[] | select(startswith("SOURCE_PR="))' | sed -n 's/SOURCE_PR=\(v[0-9]*\).*/\1/p'
```

## Restoring DB for testing

```bash
docker run \
 --name my-postgres-db \
 -e POSTGRES_USER="<user>" \
 -e POSTGRES_PASSWORD='<password>' \
 -e POSTGRES_DB="<db-name>" \
 -p 5432:5432 \
 -d postgres
```

```bash
docker exec -i my-postgres-db pg_restore -U <user> -d <db-name> < 2025-04-26T20_00_00.114Z.sql

```
