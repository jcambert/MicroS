cd ..
docker-compose -f ./compose/consul-fabio-vault.yml -f ./compose/mongo-rabbit-redis.yml -f ./compose/vscode.yml down