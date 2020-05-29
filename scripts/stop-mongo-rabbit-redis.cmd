cd ..
docker-compose -f ./compose/mongo-rabbit-redis.yml -f ./compose/elk.yml down -v
pause