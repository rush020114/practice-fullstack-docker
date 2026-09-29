# hub에서 node 20 받아오기
FROM node:20-alpine
# container에 들어갈 code 최상위 경로이며 이후 명령어들이 모두 이 폴더 안에서 실행
WORKDIR /app
# package 먼저 복사
COPY package*.json ./
# build할 때 실행되는 명령어
RUN npm install
# Docker는 변하지 않은 file을 알기 때문에 package*.json이 변하지 않으면 다시 npm i를 하지 않기 때문에 두 단계로 COPY를 나눈다.
COPY . .
# 내부 port만 개방
EXPOSE 4000
# container 실행될 때 자동으로 실행되는 명령어
# 현재는 개발용이며 배포 때는 npm start로 바꾸기
CMD ["npm", "run", "dev"]