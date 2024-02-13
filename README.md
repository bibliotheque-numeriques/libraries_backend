# LIBRARY MANAGEMENT

## To get started, initialize a TypeScript project and add the Prisma CLI as a development dependency to it:
```
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
```

### Invoke the Prisma CLI :
```
npx prisma
```

### Set up the Prisma project : 
```
npx prisma init
```

## Dependance that we need in the project :
### For install prisma adapter :`
```
npm install @prisma/client @auth/prisma-adapter
```
### Install JQuery in typescript :
```
npm i --save-dev @types/jquery
```
### Add typescript in express js :
```
npm i --save-dev @types/express
```
### Install bcrypt for authentification :
```
npm install bcrypt
npm i --save-dev @types/bcrypt
```
### Install password-validator :
```
npm install password-validator
```

## Apply the Prisma schema changes to the database :
```
npx prisma migrate dev --name tags-model
```

### Finally, for running the server :
```
npm run start
```

