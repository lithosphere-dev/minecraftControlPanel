FROM openjdk:21-jdk-slim

# Install necessary packages
RUN apt-get update && apt-get install -y \
    udev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /data/minecraft

# Copy the server files to the working directory
COPY . /minecraft
COPY server.jar /minecraft

# Accept the Minecraft EULA
RUN echo "eula=true" > eula.txt

# Expose the Minecraft server port
EXPOSE 25565

# Run the Minecraft server
CMD ["java", "-Xmx1024M", "-Xms1024M", "-jar", "server.jar", "nogui"]
