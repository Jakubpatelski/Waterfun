<div class="banner">
  <nav>
      <div class="nav_text" id="notes">
          <a href="/"><img src="../../public/img/waterfun5.png" alt=""></a>
          <a href="/about" class="hover-underline-animation"><p>O nas</p></a> 
          <a href="/cennik" class="hover-underline-animation"><p>Cennik</p></a> 
          <a href="/contact" class="hover-underline-animation"><p>Kontakt</p></a>
          <a href="/galeria" class="hover-underline-animation"><p>Galeria</p></a> 
          <a href="/wynajem" class="hover-underline-animation"><p>Wynajem</p></a> 
        </div>
        <div class="login_button_class">
          <a href="/login" class="login-button"><p>Login</p></a> 
      </div>
  </nav>
</div>

<style>
.banner {
  width: 100%;
  background-color: #2196F3;
}

nav {
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 0; 
  font-family: PlutoBold;
  font-weight: bold;
}

.nav_text{
  display: flex;
  gap: 40px;
  margin: auto;
  font-size: 22px;
}
.login_button_class{
 
  font-size: 20px;
  margin-left: 10%;
}

.hover-underline-animation {
  position: relative;
  color: #FFFFFF;
  text-decoration: none;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 20px;
  left: 0;
  background-color: rgb(244, 179, 0);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation::after {
  transform: scaleX(0);
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

img {
 
  max-width: 250px; 
 
}

.login-button {
  display: inline-block;
  background-color: transparent;
  color: #fff;
  padding: 10px 20px;
  border: 2px solid #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  display: flex;
}

.login-button:hover {
  background-color: #fff;
  color: #2196F3;
}

.login-button p {
  margin: 0; 
}

</style>
