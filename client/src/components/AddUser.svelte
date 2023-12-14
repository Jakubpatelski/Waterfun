<script>
    import Modal from './Modal.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { Base_URL } from '../stores/global';

    let modal;

    let email = ""
    let username = ""
    let password = ""
    let phoneNumber = ""
    let jobTitle = ""
    let admin = false 


    async function addUser() {
      const data = { email, username, password, phoneNumber, jobTitle, admin };
      try {
        const response = await fetch($Base_URL + "/users", {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json'
          },
          body:  JSON.stringify(data)
        });

        if(response.ok){
          toast.success(`User created`);
          setTimeout(() => {
            window.location.reload();
        }, 1000); 

        } else {
        const error = await response.json()
        toast.error(error.message);
      }
      } 
      catch (error) {
      toast.error(`Unable to create User. Error: ${error}`);
  }

    }

  </script>
  <Toaster />
<button class="add-button" on:click={() => modal.show()}>Dodaj Użytkownika</button>
    <Modal bind:this={modal}>
      <div class="form-container">
        <form on:submit|preventDefault = {addUser}>
          <div>
            <label for="name">Email:</label>
            <input type="email" id="email" name="email" required bind:value={email}>
          </div>
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required bind:value={username}>
          </div>
          <div>
            <label for="password">Hasło:</label>
            <input type="password" id="password" name="password" bind:value={password}>
          </div>
          <div>
            <label for="phoneNumber">Numer Telefonu</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" bind:value={phoneNumber} placeholder="">
          </div>
          <div>
            <label for="jobTitle">Stanowisko:</label>
            <input type="text" id="jobTitle" name="jobTitle" bind:value={jobTitle}>
          </div>
         
          <label>
            Admin         
            <input type="checkbox" bind:checked={admin} />
          </label>
         
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
