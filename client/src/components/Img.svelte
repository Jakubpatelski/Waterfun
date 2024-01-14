<script>
    export let src
  </script>
  
  <div class="container">
    <img src={src} alt="">
  </div>

    
  <style>

  .container {     
    height: 1000px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin: 0;
  }

  .container img {
    width: 100%; 
    height: auto; 
  }

</style>