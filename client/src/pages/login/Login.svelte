<script>
  import { useNavigate } from 'svelte-navigator'
  import { user } from '../../stores/userStore.js';
  import toast, { Toaster } from 'svelte-french-toast';
  import { Base_URL } from '../../stores/global.js';

  const navigate = useNavigate();

  let username = "";
  let password = "";

  async function logIn() {

  const data = { username, password };
  
  try {
    const response = await fetch($Base_URL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),

    });

    if (response.ok) {
      const userData = await response.json();
      user.set(userData);
      navigate("/admin");
    } else {
      const error = await response.json();
      toast.error(error.message);
    }
  } catch (error) {
    toast.error(error);

  }
}

</script>

<Toaster />


    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form on:submit|preventDefault={logIn}>
        <h3>Login Here</h3>
        <label for="username">Username</label>
        <input type="text" placeholder="Username" id="username" bind:value={username} >

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"  bind:value={password}>
        <button>Log In</button>
        <div class="go-back">
          <a href="/">Go back to the website</a>
      </div>

     
    </form>

    <style media="screen">
      *,
  *:before,
  *:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  .go-back {
        text-align: center;
        margin-top: 20px;
    }
    
  .background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
  }
  .background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
  }
  .shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
  }
  form{
    height: 520px;
    width: 400px;
    background-color: rgba(20, 134, 221, 0.83);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
  
  }
  form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }
  
  label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }
  ::placeholder{
    color: #e5e5e5;
  }
  button{
    margin-top: 50px;
    margin-bottom: 30px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  a{
    text-decoration: underline;

  }
 
  
  
  
    </style>