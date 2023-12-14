<script>
    import Modal from './Modal.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { Base_URL } from '../stores/global';

    let modal;
    
    let name = ""
    let phoneNumber = ""
    let email = "" 
    let address = ""
    let nip = ""
    let regon = ""


    async function addCustomer() {
      const data = { name, phoneNumber, email, address, nip, regon };
      try {
        const response = await fetch($Base_URL + "/customers", {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:  JSON.stringify(data)
        });

        if(response.ok){
          toast.success(`Customer created`);
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
   

        } else {
        const error = await response.json()
        toast.error(error.message);
      }
      } 
      catch (error) {
      toast.error(`Unable to create Customer. Error: ${error}`);
  }

    }

  </script>
  <Toaster />
<button class="add-button" on:click={() => modal.show()}>Dodaj Klienta</button>
    <Modal bind:this={modal}>
      <div class="form-container">
        <form on:submit|preventDefault = {addCustomer}>
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required bind:value={name}>
            </div>
          <div>
          <div>
            <label for="name">Email:</label>
            <input type="email" id="email" name="email" required bind:value={email}>
          </div>
          <div>
            <label for="phone_number">Number Telefonu:</label>
            <input type="text" id="phone_number" name="phone_number" required bind:value={phoneNumber}>
          </div>
          <div>
            <label for="address">Address:</label>
            <input type="text" id="address" name="address" bind:value={address}>
          </div>
          <div>
            <label for="phoneNumber">Numer Telefonu</label>
            <input type="text" id="phoneNumber" name="phoneNumber" bind:value={phoneNumber} placeholder="">
          </div>
          <div>
            <label for="nip">NIP:</label>
            <input type="text" id="nip" name="nip" bind:value={nip}>
          </div>
          <div>
            <label for="regon">REGON:</label>
            <input type="text" id="regon" name="regon" bind:value={regon}>
          </div>        
          <div class="button-wrapper">
            <button type="submit" class="submit-button">Submit</button>
            <button  on:click={() => modal.hide()} class="close-button">Close</button>
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
    background-color: white;
    padding: 50px;
    border-radius: 20px;
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