<script>
    import NavbarUser from "../../components/NavbarUser.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<NavbarUser />

<h1 class="page-title">O nas</h1>
<hr />
<section>
    <!-- Hero Section -->
    <div class="hero">
        <div class="container">
            <h1 class="title">Welcome to <span class="highlight">Water</span><span class="fun-yellow">Fun </span>Polska</h1>
            <p class="subtitle">Wyrusz z nami w podróż pełną ekscytujących przygód na wodzie.
            </p>
        </div>
    </div>

    <!-- About Us Section -->
    <div class="about-us">
        <h2>About Us</h2>
        <p>
            WaterFun Polska, założony w 2021 roku, to park wodny w Skorzęcinie zobowiązany do zapewnienia bezpieczeństwa użytkowników i jakości. Posiadając certyfikat TUV oraz wysoko wykwalifikowanych ratowników, park gwarantuje bezpieczne i przyjemne doświadczenia.
          </p>
          <p>
            Dążąc do wzmocnienia obecności online, proponujemy stronę internetową jako scentralizowane centrum informacji o parku, rezerwacji i promocjach. Ta inicjatywa jest zgodna z zaangażowaniem WaterFun Polska w bezpieczeństwo i jakość, oferując klientom informacyjną platformę do planowania wizyt.
          </p>
          
       
    </div>

    <!-- Add spacing below the About Us section -->
    <div class="spacer"></div>


    <div class="team-section">
      <div class="our-team">
        <h2>OUR TEAM</h2>
        <h4>Skontaktuj się z naszym zespołem, chętnie odpowiemy na Twoje pytania dotyczące nasz usług!</h4>
      </div>
        <div class="team">
          <div class="team-member">
            <img src="./../../public/img/waterfun-pic.jpeg" alt="Emil Tuszyński">
            <div class="name">EMIL TUSZYŃSKI</div>
            <div class="email">emil@waterfun.com</div>
          </div>
          
          <div class="team-member">
            <img src="./../../public/img/waterfun-pic.jpeg" alt="Przemysław Białas">
            <div class="name">PRZEMYSŁAW BIAŁAS</div>
            <div class="email">przemyslaw@waterfun.com</div>
          </div>
          
          <div class="team-member">
            <img src="../../../public/img/waterfun-pic.jpeg" alt="Zbigniew Hoszewski">
            <div class="name">ZBIGNIEW HOSZOWSKI</div>
            <div class="email">zbigniew@waterfun.com</div>
          </div>
        </div>
      </div>
      

    <!-- Contact Section -->
    <div class="contact">
        <h2 class="contact-h2">CONTACT US</h2>
        <h4>Masz pytania lub chcesz zarezerwować przygodę? Skontaktuj się z nami!</h4>
        <a href="/contact" class="contact-button">Get in Touch</a>
    </div>

  </section>

<style>

    .hero {
        color: black;
        text-align: center;
        padding: 50px 0;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
    }

    .title {
        font-size: 3em;
        margin-bottom: 10px;
    }

    .highlight {
        color: #007BFF;
    }
    .fun-yellow{
        color:rgb(244, 159, 0)
    }

    .subtitle {
        font-size: 1.5em;
    }

    .about-us {
        margin: 0% 20%;
        text-align: justify;
        padding: 20px;
        background-color: #f8f8f8;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        color: #444;
        font-size: 1.3rem;

    }



    .spacer {
        height: 30px;
    }

    .contact {
        text-align: center;
        padding: 50px;
    }

    .contact-button {
        font-size: 20px;
        display: inline-block;
        background-color: #007BFF;
        color: #fff;
        padding: 15px 30px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
        transition: background-color 0.3s ease-in-out;
        border: 2px solid black;


    }

    .contact-button:hover {
        background-color: #fff;
        color: #007BFF;
        border: 2px solid black;
        border-color: #007BFF;  
    }


.page-title {
  text-align: center; /* Center the title */
  margin: 3%; /* Add some space below the title */

}

hr {
  border: none; /* Remove default border */
  height: 2px; /* Thickness of the line */
  background-color:#D3E5FF; /* Color of the line */
  width: 100%; /* Full width of the container */
  margin-top: 0; /* Remove default margin */
}

.team-section {
    text-align: center;
  }

  .team-section h2 {
    color: rgb(117, 128, 138);
  }

  .team {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .team-member {
    margin: 10px;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .team-member img {
    width: 350px;
    height: 300px;
  }

  .name {
    margin-top: 15px;
    font-size: 1.2em;
    color: #333;
  }

  .email {
    color: #555;
    font-size: 1.1em;
  }

  .our-team{
    margin: 50px;
  }

  h4{
    font-size: 1.3em;
  }
  .contact-h2{
    color: rgb(117, 128, 138);

  }
</style>

<Footer />
