# Here we are getting our node as Base image
FROM node:14

# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
# RUN mkdir 1some2jo
COPY . .
# WORKDIR 1some2jo

# npm install 을 실행
RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node 

WORKDIR src

#컨테이너에서 실행될 명령을 지정
RUN ["ls"]

CMD ["nodemon", "app.ts"]

#가상 머신에 오픈할 포트
EXPOSE 80