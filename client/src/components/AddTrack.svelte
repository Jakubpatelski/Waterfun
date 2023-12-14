<script>
    import Modal from './Modal.svelte';
    import toast, { Toaster } from 'svelte-french-toast';

    export let refresh;
    let modal;



let newPost = {
        name: '',
        description: '',
        img: '',
}

let files;

let uploadOK = false;


async function uploadImage() {
    try {
        const formData = new FormData();
        formData.append('file', files[0]);
        const response = await fetch("http://localhost:8080/api/tracks/upload_image", {
            method: 'POST',
            body: formData,
        });
      
        if (response.ok) {
            const { result } = await response.json();
            newPost.img =  result.variants.filter((variant) => variant.split("/").pop() === 'original')[0]
            uploadOK = true;
        } else {
            uploadOK = false;
        }
    } catch (error) {
        uploadOK = false;
        console.error(error);
    }
} 

async function post() {
    try {
        const response = await fetch('http://localhost:8080/api/tracks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        if (response.ok) {
          toast.success('Track Added');
          setTimeout(() => {
            window.location.reload();
        }, 1000); 
        } else {

        }
    } catch (exception) {
        console.error(exception);
    }
}

  </script>
  
  <Toaster />
  <button class="add-button" on:click={() => modal.show()}>Dodaj Track</button>
    <Modal bind:this={modal}>
      <div class="form-container">
        <form on:submit|preventDefault={post} enctype="multipart/form-data">
          <div>
    
            <label for="name">Nazwa:</label>
            <input type="text" id="name" name="name" required bind:value={newPost.name}>
          </div>
          <div>
            <label for="description">Opis:</label>
            <input type="text" id="description" name="description" required bind:value={newPost.description}>
          </div>
          <div class="mb-4">
            <label for="file" class="block text-gray-700 text-sm font-bold mb-2">
                Image:
            </label>
            <form action="/api/tracks/upload_image" method="post" enctype="multipart/form-data">
              <input bind:files on:change={uploadImage} accept="image/png, image/jpeg, image/gif, image/webp, image/svg" type="file" name="file" />
            </form>
        </div>
          <div class="button-wrapper">
            <button disabled={!uploadOK} type="submit" class="submit-button">Submit</button>
            <button on:click={refresh} on:click={() => modal.hide()} class="close-button">Close</button>
          </div>
      
        </form>
      </div>
    </Modal>


  <style>
    .add-button {
      margin-top: 2%;
      float: right;
      margin-right: 2%;
      background-color: #4a9d50;
      color: white;
      font-size: 20px;
      padding: 20px 20px;
      cursor: pointer;
      border-radius: 8px;
      border: none;
        
   }

   .add-button:hover {
    background-color: #0b5810;
   }

  .form-container {
    max-width: 400px;
    margin: 0 auto;
    background-color:white;
    padding: 50px;
    border-radius: 10px;

  }



  .form-container label {
    display: block;
    margin-bottom: 10px;
  }

  .form-container input,
  .form-container button {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .form-container .button-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .form-container button.submit-button {
    width: 48%; /* Adjusted width to accommodate both buttons */
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }

  /* .submit-button:disabled {
    background-color: grey;
    cursor: not-allowed;
  } */

  .form-container button.submit-button:disabled {
    /* background-color: #45a049; */
    background-color: grey;
    cursor: not-allowed;
  }


  .form-container button.submit-button:disabled:hover {
    /* background-color: #45a049; */
    /* background-color: grey;
    cursor: not-allowed; */
    background-color: grey;
    cursor: not-allowed;

  }
  .form-container button.submit-button:hover {
    background-color: #45a049;
  }

  .form-container button.close-button {
    width: 48%; /* Adjusted width to match the submit button */
    background-color: #f44336;
    color: white;
    cursor: pointer;
  }

  .form-container button.close-button:hover {
    background-color: #d32f2f;
  }


</style>