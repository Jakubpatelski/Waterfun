<script>
// @ts-nocheck

    import Carousel from 'svelte-carousel'
    import Img from './Img.svelte'
    
</script>
    
    <div class="background-color">
        <Carousel
        
        autoplay
        autoplayDuration={3000}
           
        let:showPrevPage
        let:showNextPage
            >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div slot="prev" on:click={showPrevPage} class="custom-arrow custom-arrow-prev">
                <i />
              </div>
                <Img  src='../../public/img/waterfun-photo3.jpeg'/>
                <Img  src='../../public/img/waterfun-photo2.jpeg'/>
                <Img  src='../../public/img/waterfun-photo4.jpeg'/>
                <Img  src='.../../public/img/waterfun-photo1.jpeg'/>
                <Img  src='.../../public/img/waterfun-photo5.jpeg'/>



                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div slot="next" on:click={showNextPage} class="custom-arrow custom-arrow-next">
                    <i />
                  </div>
             
    
        </Carousel>
    </div>


    
        <style>
    
    .background-color{
        background-color: #2196F3;
    }
    
  
    
        </style>
    