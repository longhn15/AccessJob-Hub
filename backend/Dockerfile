FROM maven:3.9-eclipse-temurin-17-alpine AS build

WORKDIR /app

COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

RUN apk add --no-cache wget \
    && addgroup -S appgroup \
    && adduser -S appuser -G appgroup
USER appuser

COPY --from=build /app/target/accessjob-hub-api-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
