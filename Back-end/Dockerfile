FROM eclipse-temurin:21-jdk-alpine
RUN apk update && apk add maven
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests
CMD [ "java", "-jar", "target/back-end-0.0.1-SNAPSHOT.jar" ]