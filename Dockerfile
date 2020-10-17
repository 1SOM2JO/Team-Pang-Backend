# Here we are getting our node as Base image
FROM node:13

# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . .
# npm install 을 실행
RUN npm install

#환경변수 NODE_ENV 의 값을 development 로 설정
ENV NODE_ENV development

#가상 머신에 오픈할 포트
EXPOSE 80

#컨테이너에서 실행될 명령을 지정
CMD ["npm", "start"]