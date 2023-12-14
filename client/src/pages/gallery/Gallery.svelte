<script>
    import NavbarUser from "../../components/NavbarUser.svelte";
    import Footer from "../../components/Footer.svelte";
    import Modal from "../../components/Modal.svelte";

  let selectedImageIndex = 0;
  let modal;

  const images = [
      '../../../public/img/waterfun-photo1.jpeg',
      '../../../public/img/waterfun-photo2.jpeg',
      '../../../public/img/waterfun-photo3.jpeg',
      '../../../public/img/waterfun-photo4.jpeg',
      '../../../public/img/waterfun-photo5.jpeg',
      '../../../public/img/waterfun-photo6.jpeg',
  ];

  function openModal(imageIndex) {
      selectedImageIndex = imageIndex;
      modal.show();
  }

  function closeModal() {
      selectedImageIndex = 0;
      modal.hide();
  }

  function changeImage(direction) {
      if (direction === 'left') {
          selectedImageIndex = (selectedImageIndex - 1 + images.length) % images.length;
      } else if (direction === 'right') {
          selectedImageIndex = (selectedImageIndex + 1) % images.length;
      }
  }

</script>
<NavbarUser />

<h1 class="page-title">Wynajem</h1>
<hr />
<div class="gallery">
{#each images as image, index}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
  class="small-img"
      src={image}
      alt={`Image ${index + 1}`}
      on:click={() => openModal(index)}
  />
{/each}
</div>

{#if selectedImageIndex !== null}
  <Modal bind:this={modal}>

        <img class="img-modal" src={images[selectedImageIndex]} alt={`Image ${selectedImageIndex + 1}`} />


        <div class='modal-container'>
            <button on:click={() => changeImage('left')}>&#8592;</button>
            <button on:click={closeModal}>&times;</button>
            <button on:click={() => changeImage('right')}>&#8594;</button>
        </div>
  </Modal>
{/if}
<Footer />

<style>



  .img-modal {
  display: block;
  margin: 0 auto;
  height: 700px;
  width: 1000px;
  
  border-radius: 20px;
 
}

 .gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0px;
}

.gallery img {
  width: 100%;
  max-width: 550px;
  object-fit: cover;
  border-radius: 10px;
}



.small-img:hover {
    /* -webkit-transform:scale(1.5); 
    transform:scale(1.5); */
    cursor: pointer;
    opacity: 0.6;
}

.modal-container {
      text-align: center; 
      margin-top: 10px;

  }



  button {
      padding: 10px 0px;
      width: 80px;
      font-size: 20px;
      cursor: pointer;
      border: none;
      background-color: #3498db;
      color: #fff;
      border-radius: 5px;
      transition: background-color 0.3s;
      margin: 0 5px; 
  }

  button:hover {
      background-color: #2980b9;
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