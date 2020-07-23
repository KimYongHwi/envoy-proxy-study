# Pull base image.
FROM openjdk:11.0.6-jdk

# JAVA
ENV HOME=/home/gateway
ENV TZ=Asia/Seoul

RUN mkdir -p /usr/local/lib/gateway

# JAR
COPY gateway/build/libs/gateway-0.0.1-SNAPSHOT.jar /usr/local/lib/gateway

EXPOSE 8000

CMD ["/usr/local/openjdk-11/bin/java", "-Dspring.profiles.active=dev", "-Xms256m", "-Xmx256m", "-XX:ParallelGCThreads=2", "-jar", "/usr/local/lib/gateway/gateway-0.0.1-SNAPSHOT.jar"]
