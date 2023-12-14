<script>
    import NavbarUser from "../../components/NavbarUser.svelte";
    import Footer from "../../components/Footer.svelte";
    import toast, { Toaster } from 'svelte-french-toast';
    import { Base_URL } from "../../stores/global";
</script>

<NavbarUser />
<Toaster />

<h1 class="page-title">O nas</h1>
<hr />
<section>
    <!-- Hero Section -->
    <div class="hero">
        <div class="container">
            <h1 class="title">Welcome to <span class="highlight">Water</span><span class="fun-yellow">Fun </span>Polska</h1>
            <p class="subtitle">Embark on a journey of thrilling water adventures with us.</p>
        </div>
    </div>

    <!-- About Us Section -->
    <div class="about-us">
        <h2>About Us</h2>
        <p>
            WaterFun Polska, established in 2021, is a water park in Skorzęcin committed to user safety and quality. With a TUV certificate and highly trained lifeguards, the park ensures a secure and enjoyable experience.
        </p>
        <p>
            Seeking to enhance online presence, we propose a website as a centralized hub for park details, bookings, and promotions. This initiative aligns with WaterFun Polska's dedication to safety and quality, offering customers an informative platform for planning visits.
        </p>
       
    </div>

    <!-- Add spacing below the About Us section -->
    <div class="spacer"></div>

    <!-- Contact Section -->
    <div class="contact">
        <h2>Contact Us</h2>
        <p>Have questions or want to book an adventure? Contact us!</p>
        <a href="/contact" class="contact-button">Get in Touch</a>
    </div>

    <!-- Facebook Page -->
    <div id="fb-root"></div>
    <div class="fb-page" data-href="https://www.facebook.com/profile.php?id=100068474460939&amp;locale=pl_PL" data-tabs="timeline" data-width="" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
        <blockquote cite="https://www.facebook.com/profile.php?id=100068474460939&amp;locale=pl_PL" class="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/profile.php?id=100068474460939&amp;locale=pl_PL">WaterFun- Skorzęcin</a>
        </blockquote>
    </div>

    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0" nonce="bsG7vBcu"></script>
</section>

<style>
    /* Add your custom styles here */
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .hero {
        color: black;
        text-align: center;
        padding: 100px 0;
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
        max-width: 800px;
        margin: 0 auto;
        text-align: justify;
        padding: 20px;
        background-color: #f8f8f8;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        color: #444;
    }

    .about-us p {
        margin-bottom: 20px;
    }

    .spacer {
        height: 30px; /* Adjust the height as needed for spacing */
    }

    .contact {
        text-align: center;
        padding: 50px;
    }

    .contact p {
        color: #333;
    }

    .contact-button {
        display: inline-block;
        background-color: #007BFF;
        color: #fff;
        padding: 15px 30px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
        transition: background-color 0.3s ease-in-out;
    }

    .contact-button:hover {
        background-color: #0056b3;
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
</style>

<Footer />
