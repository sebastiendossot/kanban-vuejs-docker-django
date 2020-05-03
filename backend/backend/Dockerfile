FROM python:3.7

ENV POSTGRES_ENGINE "django.db.backends.postgresql"
ENV POSTGRES_NAME "postgres"
ENV POSTGRES_USER "postgres"
ENV POSTGRES_HOST "db"
ENV POSTGRES_PORT 5432
ENV POSTGRES_HOST_AUTH_METHOD 'trust'

RUN mkdir /app

WORKDIR /app

COPY requirements.txt /app

RUN pip3 install -r requirements.txt

COPY . /app

# RUN python3 ./manage.py runserver 0.0.0.0:8030

CMD [ "python3", "./manage.py", "runserver", "0.0.0.0:8080" ]
