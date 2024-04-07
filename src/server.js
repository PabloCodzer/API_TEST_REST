import App from './app';
const port = process.env.APP_PORT;

App.listen(port, ()=>{
  console.log("server ouvindo na porta 3001");
});