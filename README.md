# angelpods

backend 설정

1. docker 설치
2. 터미널에서 
  docker run -p 5432:5432 -e POSTGRES_PASSWORD=tiger -e POSTGRES_USER=scott -e POSTGRES_DB=angelpods --name postgres_boot -d postgres
3. doceker -> dashboard 에서 postgres_boot 실행
4. backend 스프링 부트로 실행

frontend 설정

1. npm install
2. npm start
