<script>
    import { user } from "../../stores/userStore";
    import { onMount } from "svelte";
    import toast, { Toaster } from 'svelte-french-toast';
    import { Base_URL } from '../../stores/global.js';
    import Navbar from "../../components/Navbar.svelte";
    import AddUser from "../../components/AddUser.svelte";
    import Modal from "../../components/Modal.svelte";

    let modal;
    let users = [];
    const isAdmin = $user.message.isAdmin;
  
    onMount(async () => {
      await getUsers();
    });

    let selectedUser = null;

    function selectUser(user) {
      selectedUser = user;
    }
  
    async function getUsers() {
      const response = await fetch($Base_URL + '/users');
      const { data } = await response.json();
      users = data;
    }
  
    async function deleteUser(userId) {
        const user = users.find(a => a.id === userId)
        const confirmDelete = confirm(`Are you sure you want to delete user ${user.username}?`);

      if(confirmDelete){
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "DELETE",
        credentials: "include"
      });
    
  
      if (response.ok) {
        toast.success(`${user.username} deleted`)
        await getUsers();
      } else {
        toast.error("Error")
      }
    }
}


async function updateUser() {    

   const data = {
    phoneNumber: selectedUser.phone_number, 
    jobTitle: selectedUser.job_title,
    admin: selectedUser.admin,
  };

      
      try {
        const response = await fetch(`http://localhost:8080/api/users/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast.success(selectedUser.username + " edited!");
          modal.hide(); // Close the modal after a successful update
          getUsers();
        }
      } catch (error) {
          toast.error(error);
      }
  }
  </script>

<style>
.container {
  margin-top: 7%;
  
}
  .responsive-table {
    width: 90%; 
    margin: 0 auto;
   
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
    margin-bottom: 30px; 
    background-color: white;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }

  .col {
    flex: 1;
    text-align: left;
  }
 
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


  input[type="checkbox"] {
    margin-bottom: 20px;
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

<Navbar />
<Toaster />

{#if isAdmin}
  <AddUser />
{/if}

<div class="container">
  <table class="responsive-table">
    <tr class="table-header">
      <th class="col col-1">Username</th>
      <th class="col col-2">Email</th>
      <th class="col col-3">Numer telefonu</th>
      <th class="col col-4">Stanowisko</th>
      <th class="col col-5">Administracja</th>
    </tr>
    {#if users.length > 0}
      {#each users as user}
        <tr class="table-row">
          <td class="col col-1" data-label="Username">{user.username}</td>
          <td class="col col-2" data-label="Email">{user.email}</td>
          <td class="col col-3" data-label="Phone Number">{user.phone_number}</td>
          <td class="col col-4" data-label="Job Title">{user.job_title}</td>
          <td class="col col-5" data-label="Action">
            {#if isAdmin}
              <button class="delete-btn" on:click={() => deleteUser(user.id)}>Delete</button>
              <button class="edit-btn" on:click={() => { selectUser(user); modal.show(); }}>Edit</button>
            {:else}
              <p>You are not admin</p>
            {/if}
          </td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="5">No users available</td>
      </tr>
    {/if}
  </table>
</div>

<!-- Edit user -->
<Modal bind:this={modal}>
  {#if selectUser}
    <div class="form-container">
      <form on:submit|preventDefault={updateUser}>
        <div>
          <h1>{selectedUser.username}</h1>
          <label for="phoneNumber">Numer Telefonu:</label>
          <input type="tel" id="phone_number" name="phone_number" bind:value={selectedUser.phone_number} placeholder="">
        </div>
        <div>
          <label for="jobTitle">Stanowisko:</label>
          <input type="text" id="job_title" name="job_title" bind:value={selectedUser.job_title}>
        </div>

        <label>
          Admin
          <input type="checkbox" id="admin" name="admin" bind:checked={selectedUser.admin} />
        </label>

        <div class="button-wrapper">
          <button type="submit" class="submit-button">Submit</button>
          <button on:click={() => modal.hide()} class="close-button">Close</button>
        </div>
      </form>
    </div>
  {/if}
</Modal>