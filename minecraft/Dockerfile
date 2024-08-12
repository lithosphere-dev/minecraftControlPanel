FROM openjdk:21-jdk-slim

RUN apt-get update && apt-get install -y \
    udev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /minecraft

COPY . /minecraft

RUN echo "eula=true" > eula.txt

EXPOSE 25565

CMD ["java", "-Xmx1024M", "-Xms1024M", "-jar", "server.jar", "nogui"]

