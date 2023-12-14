<script>
  import Footer from "../../components/Footer.svelte";
  import NavbarUser from "../../components/NavbarUser.svelte";
    
</script>


<NavbarUser />

    <h1 class="page-title">Cennik</h1>
    <hr />

    <div class="grid-container">
        <h1>Bilety godzinne</h1>
        <h1>poniedziałek - piątek</h1>
        <div class="grid-item">1h</div>
        <div class="grid-item">45 PLN</div>
        <div class="grid-item">2h</div>
        <div class="grid-item">60 PLN</div>
        <div class="grid-item">3h</div>
        <div class="grid-item">70 PLN</div>
        <div class="grid-item">4h</div>
        <div class="grid-item">75 PLN</div>
        <div class="additional-info-container">
            <h1 class="red-h1">Przekroczyłes wykupiony czas?</h1>
            <h1>Nic nie szkodzi, poprostu dopłacasz do kolejnej godziny i bawisz się dalej!</h1>
        </div>
    </div>

        <div class="grid-container">
            <h1>Bilet Całodniowy</h1>
            <h1>poniedziałek - piątek</h1>
            <div class="grid-item">Cały dzień</div>
            <div class="grid-item">90 PLN</div>
        </div>
    
        <div class="grid-container">
            <h1>Skrytka</h1>
            <h1>poniedziałek - piątek</h1>
            <div class="grid-item">Cały dzień</div>
            <div class="grid-item">5 PLN</div>
        </div>

    <div class="grid-container">
        <h1 class="red-h1">Grupa powyzej 10 osob?</h1>
        <a href="/contact"><h1 class="contact">Skontaktuj sie z nami!</h1></a>
       
    </div>

<footer />

<style>

    
    .grid-container {
        display: grid;
        grid-template-columns: auto auto;
        background-color: #f1f1f1;
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 5%;
        margin-bottom: 5%;
        text-align: center;
        gap: 5px;
        border-radius: 10px;
        padding: 10px;
    }

    .grid-item {
        background-color: #2196F3;
        padding: 20px;
        font-size: 30px;
        border-radius: 10px;
        color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
        
    }

    @media only screen and (max-width: 768px) {
    .grid-container {
        grid-template-columns: auto;
        margin-left: 5%;
        margin-right: 5%;
    }
}

    .grid-item:hover {
    background-color: #066cd1; /* Change to a darker shade on hover */
    transform: scale(1.05);
    }

    h1{
        color: #f7941e;
    }

    .additional-info-container {
        grid-column: span 2;
    }

    .red-h1 {
        color: red;
    }

    .contact:hover{
        color: #f7781e;
    }

    .page-title {
    text-align: center; /* Center the title */
    margin: 3%; /* Add some space below the title */
    color: black;
  
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
