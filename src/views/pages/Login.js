import mockUpImg from "../../assets/img_login_mockup.png";

function Login() {
  return (
    <section className="container">
      <div className="h-48 flex-wrap space-x-4 justify-center content-center">
        <img src={mockUpImg} alt="mockup"></img>
        <div>Hi</div>
      </div>
    </section>
  );
}

export default Login;
