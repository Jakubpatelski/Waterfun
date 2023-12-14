<footer>
<div class="grid-container">
    <div class="grid-item">
        <h1>Lokalizacja</h1>
        <p>al. Plażowa, 62-215 Skorzęcin, Poland</p>
        <img src="../../public/img/smmalpalm.webp" alt="" class="palm">
    </div>
    <div class="grid-item">
       <div class="date-hours">
        <h1>Godziny otwarcia</h1>
        <p>Poniedzialek <span>10:00-21:00</span></p>
        <p>Wtorek <span>10:00-21:00</span></p>
        <p>Środa <span>10:00-21:00</span></p>
        <p>Czawartek <span>10:00-21:00</span></p>
        <p>Piątek <span>10:00-21:00</span></p>
        <p>Sobota <span>10:00-21:00</span></p>
        <p>Niedziela <span>10:00-21:00</span></p>
    </div>
   </div>
    <div class="grid-item">
       <h1>Masz jakieś pytania?</h1>
       <a href="/contact" ><p class="contact">Skontaktuj się</p></a>
       <p>Obserwuj nas na mediach społecznościowych</p>
       <a href="https://www.facebook.com/profile.php?id=100068474460939&locale=pl_PL" target="_blank"><img src="../../public/img/facebook.png" alt="" class='facebook'></a>
    </div>
</div>
</footer>


<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  color: white;
  font-family: PlutoBold;
  font-weight: bold;
  letter-spacing: 0.1em;
}
.grid-item {
  text-align: center;
  margin: 0px 40px;
}


.palm{
    width: 100px;
    height: 100px;
    mix-blend-mode: multiply;
}

a{
    color: rgb(244, 179, 0);
    font-size: 30px;
}

footer {
  width: 100%;
  bottom: 0;
  background: #222;
  color: white;
}

span {
    color: rgb(244, 179, 0);


}

.facebook{
    width: 70px;
    height: 70px;
}

.contact:hover{
    color: rgb(236, 137, 16);
    cursor: pointer;
}

</style>