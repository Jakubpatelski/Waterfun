<script>
    import AddTrack from "../../components/AddTrack.svelte";
    import Navbar from "../../components/Navbar.svelte";
    import { onMount } from "svelte";
    import { user } from "../../stores/userStore";
    import toast, { Toaster } from 'svelte-french-toast';
    import Modal from "../../components/Modal.svelte";

    let modal;


    const isAdmin = $user.message.isAdmin;

    let tracks = [];
    let selectedTrack = null;



    onMount(async () => {
      await getTracks();
    });

    function selectTrack(track) {
        selectedTrack = track;
    }
  
  // Fetch the player data from the server
    export async function getTracks() {
      const response = await fetch('http://localhost:8080/api/tracks');
      const { data } = await response.json();
      tracks = data;   
    }

    async function deleteTrack(trackId){
      const track = tracks.find(t => t.id === trackId);
      const confirmDelete = confirm(`Are you sure you want to delete player ${track.name}?`);

      if(confirmDelete){
        const response = await fetch(`http://localhost:8080/api/tracks/${trackId}`, {
          method: "Delete",
          credentials: "include"
        });

        if(response.ok){
          toast.success(`${track.name} deleted`);
          await getTracks();
        }  else {
          toast.error("Error");
        }

      }

    }

    let files;
    let uploadOK = false;

    async function uploadImage() {
    try {
        const formData = new FormData();
        console.log(formData)
        formData.append('file', files[0]);
        const response = await fetch("http://localhost:8080/api/tracks/upload_image", {
            method: 'POST',
            body: formData,
        });
      
        if (response.ok) {
            const { result } = await response.json();
            selectedTrack.img =  result.variants.filter((variant) => variant.split("/").pop() === 'original')[0]
            uploadOK = true;
        } else {
            uploadOK = false;
        }
    } catch (error) {
        uploadOK = false;
        console.error(error);
    }
} 


    async function updateTrack() {      
      try {

    const response = await fetch(`http://localhost:8080/api/tracks/${selectedTrack.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(selectedTrack),
    });

        if (response.ok) {
          toast.success('success');
          modal.hide();
         await getTracks()
        }
      } catch (error) {
          toast.error(error);
      }
  }
</script>
<Toaster />
<Navbar />
<AddTrack refresh={getTracks}/>


<div class="container">
    <table class="responsive-table">
      <tr class="table-header">
        <th class="col col-3">IMG</th>
        <th class="col col-1">Nazwa</th>
        <th class="col col-2">Opis</th>
        <th class="col col-3">Administracja</th> 
        </tr>
      {#if tracks.length > 0}
        {#each tracks as track}
          <tr class="table-row">
            <td class="col col-1" data-label="Username"><a href={track.img} target="_blank"><img src={track.img} alt=""></a></td>
            <td class="col col-2" data-label="Email">{track.name}</td>
            <td class="col col-2" data-label="Email">{track.description}</td>
            <td class="col col-5" data-label="Action">
              {#if isAdmin}
              <button class="delete-btn" on:click={() => deleteTrack(track.id)}>Delete</button>
              <button class="edit-btn" on:click={() => { selectTrack(track); modal.show(); }}>Edit</button>
              {:else}
              <p>You are not the admin</p>
            {/if}
            </td>
          </tr>
        {/each}
      {:else}
     <p>No tracks available</p>
      {/if}

  </div>


    <Modal bind:this={modal}>
      <div class="form-container">
        <form on:submit|preventDefault={updateTrack} enctype="multipart/form-data">
          <div>
            <label for="name">Nazwa:</label>
            <input type="text" id="name" name="name" required bind:value={selectedTrack.name}>
          </div>
          <div>
            <label for="description">Opis:</label>
            <input type="text" id="description" name="description" required bind:value={selectedTrack.description}>
          </div>
          <div class="mb-4">
            <label for="file" class="block text-gray-700 text-sm font-bold mb-2">
              Image:
            </label>
            <input bind:files on:change={() => uploadImage()} accept="image/png, image/jpeg, image/gif, image/webp, image/svg" type="file" name="file" />
          </div>
          <div class="button-wrapper">
            <button disabled={!uploadOK} type="submit" class="submit-button">Submit</button>
            <button on:click={() => modal.hide()} class="close-button">Close</button>
          </div>
        </form>
      </div>
    </Modal>
    

  <style>

    .container {
      margin-top: 7%;
    }
    
    .form-container button.submit-button:disabled {
    background-color: grey;
    cursor: not-allowed;
  }


  .form-container button.submit-button:disabled:hover {
    background-color: grey;
    cursor: not-allowed;

  }
 
    img{
        width: 150px;
        height: 120px;
        border-radius: 8px;
    }
    
  .responsive-table {
    width: 90%; 
    margin: 0 auto;
  }


  .col {
    flex: 1;
    text-align: left;
  }
 

  .table-header{
    display: flex;
    justify-content: space-between;
    padding: 22px 20px;
    background-color: #2c3e50;
    color: white;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    
  }
  
  .table-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    background-color: #2c3e50;
    color: black;
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);    
  }


  

  .col {
    flex: 1;
  }
 
  /* Form Styles */
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
  }

  label {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    display: block;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
  }

  .delete-btn, .edit-btn {
  color: white;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 5px;
  cursor: pointer;
  width: 150px; 
  padding: 13px;
  border-radius: 5px;
}
.delete-btn {
  background-color: #f44336;
}

.edit-btn {
  background-color: #4caf50;
}


  .button-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .submit-button,
  .close-button {
    width: 48%;
    cursor: pointer;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: white;
  }

  .submit-button {
    background-color: #4caf50;
  }

  .submit-button:hover {
    background-color: #27ae60;
  }

  .close-button {
    background-color: #e74c3c;
  }

  .close-button:hover,
  .delete-btn:hover {
    background-color: #c0392b;
  }

  .submit-button:hover,
  .edit-btn:hover {
    background-color: #0b5810;
  }
</style>

    