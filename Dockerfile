FROM openjdk:14

ENV ENVIRONMENT=prod

MAINTAINER Thanh Duong <thanh.dn2503@gmail.com>

ADD backend/target/aeropath.jar app.jar

CMD ["sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGODB_URI -Dauth.jwt.secret=$JWT_SECRET -Doauth.github.client.id=$GITHUB_CLIENT_ID -Doauth.github.client.secret=$GITHUB_CLIENT_SECRET -Doauth.github.redirecturl=$GITHUB_REDIRECT_URL -Dgoogle.apikey=$GOOGLE_API_KEY -jar /app.jar"]
