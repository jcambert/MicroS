cd ..
set COMPOSE_CONVERT_WINDOWS_PATHS=1
docker-compose -f ./compose/consul-fabio-vault.yml -f ./compose/mongo-rabbit-redis.yml -f ./compose/vscode.yml up -d
