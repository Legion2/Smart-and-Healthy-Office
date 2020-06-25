FROM python:3.7

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

ENV ROOMS_CONFIG_FILE=rooms.json
ENV LOCALIZATION_CONFIG_FILE=localization.json

COPY . .

ENTRYPOINT [ "python", "-u", "./main.py" ]
