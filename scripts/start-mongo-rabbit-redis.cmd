cd ..
docker-compose -f ./compose/mongo-rabbit-redis.yml -f ./compose/elk.yml up -d
pause