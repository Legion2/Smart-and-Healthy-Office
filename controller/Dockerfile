FROM ubuntu:20.04 AS pddl-builder

RUN apt-get update && apt-get install --no-install-recommends -y \
    cmake     \
    g++       \
    make      \
    mercurial \
    python

WORKDIR /workspace/downward/

# Set up some environment variables.
ENV CXX g++

# Clone the desired tag into the current directory.
RUN hg clone http://hg.fast-downward.org . -r release-19.06.0

# Invoke the build script with default options.
RUN ./build.py
RUN strip --strip-all builds/release/bin/downward

FROM maven:3.6.3-jdk-11 AS builder
WORKDIR /src
COPY pom.xml /src
RUN mvn dependency:go-offline
COPY . /src
RUN mvn package -Dmaven.test.skip=true

FROM ubuntu:20.04

ARG JAVA_PACKAGE=openjdk-11-jre-headless
ARG RUN_JAVA_VERSION=1.3.5

ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en'

RUN apt-get update && apt-get install --no-install-recommends -y \
    python curl ca-certificates ${JAVA_PACKAGE} \
    && rm -rf /var/lib/apt/lists/*
# Install java and the run-java script
# Also set up permissions for user `1001`
RUN mkdir /deployments \
    && chown 1001 /deployments \
    && chmod "g+rwX" /deployments \
    && chown 1001:root /deployments \
    && curl https://repo1.maven.org/maven2/io/fabric8/run-java-sh/${RUN_JAVA_VERSION}/run-java-sh-${RUN_JAVA_VERSION}-sh.sh -o /deployments/run-java.sh \
    && chown 1001 /deployments/run-java.sh \
    && chmod 540 /deployments/run-java.sh

# Configure the JAVA_OPTIONS, you can add -XshowSettings:vm to also display the heap size.
ENV JAVA_OPTIONS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"

# Copy the relevant files from the previous docker build into this build.
COPY --from=pddl-builder /workspace/downward/fast-downward.py /workspace/downward/
COPY --from=pddl-builder /workspace/downward/builds/release/bin/ /workspace/downward/builds/release/bin/
COPY --from=pddl-builder /workspace/downward/driver /workspace/downward/driver

ENV DOWNWARD_PLANNER_PATH=/workspace/downward/ AI_ENABLED=true CONFIG_PATH=/config

COPY --from=builder --chown=1001:0 /src/target/lib/* /deployments/lib/
COPY --from=builder --chown=1001:0 /src/target/*-runner.jar /deployments/app.jar
COPY --from=builder --chown=1001:0 /src/rooms.json /src/localization.json /config/ 

EXPOSE 8080
USER 1001

ENTRYPOINT [ "/deployments/run-java.sh" ]