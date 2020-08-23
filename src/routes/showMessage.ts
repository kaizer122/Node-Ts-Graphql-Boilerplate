export const showMessage = ({ fullName, image = "valid-user.png", message = "" }) => `<header>
  <header>
  <link href="https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap" rel="stylesheet"> 
  <style>
  p,body {
    font-family: 'Poppins', sans-serif; 
    font-weight: 400
    }
  .center-div
  {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 400px;
  height: 250px;
  background-color: white;
  border-radius: 25px;
  -webkit-box-shadow: 0px 0px 22px 0px rgba(112,112,112,0.4);
  -moz-box-shadow: 0px 0px 22px 0px rgba(112,112,112,0.4);
  box-shadow: 0px 0px 22px 0px rgba(112,112,112,0.4);
  }
  .Rounded_Rectangle{
  height: 30%;
  width:100%;
  border-radius: 25px;
  background-image: -moz-linear-gradient( 90deg, rgb(0,154,72) 0%, rgb(109,198,70) 99%);
  background-image: -webkit-linear-gradient( 90deg, rgb(0,154,72) 0%, rgb(109,198,70) 99%);
  background-image: -ms-linear-gradient( 90deg, rgb(0,154,72) 0%, rgb(109,198,70) 99%);
  }
  .img {
  height: 62px;
  padding-top: 6px;
  }
  .container {
  height: 70%;
  padding: 10px;
  margin-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  }
  .mainText {
  font-weight: 700;
  font-size:16px;
  }
  .btn{
  background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  text-align: center; fontSize:14px; color: #FF00BD
  }
  </style>
  </header>
  <body style="background-color: whiteSmoke;">
  <div class="center-div">
  <div class="Rounded_Rectangle">
  <center>
     <img src="${process.env.API_URL}/public/images/email_images/${image}" class="img">
    </center>
  </div>
  <div class ="container">
     <p class="mainText"> Bonjour ${fullName} </p>
    <p>${message} </p>
  </div>
  
  </div>
  </body>
  `;
