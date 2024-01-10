<script>
    import { user } from "../../stores/userStore";
    import { onMount } from "svelte";
    import toast, { Toaster } from 'svelte-french-toast';
    import { Base_URL } from '../../stores/global.js';
    import Navbar from "../../components/Navbar.svelte";
    import Modal from "../../components/Modal.svelte";
    // @ts-ignore
    import AddCustomer from "../../components/AddCustomer.svelte";

    let modal;
    let customers = [];
    const isAdmin = $user.message.isAdmin;
  
    onMount(async () => {
      await getCustomers();
    });

    let selectedCustomer = null;

    function selectCustomer(customer) {
      selectedCustomer = customer;
    }
  
    async function getCustomers() {
      const response = await fetch($Base_URL + '/customers');
      const { data } = await response.json();
      customers = data;
    }
  
    async function deleteCustomer(customerId) {
        const user = customers.find(c => c.id === customerId)
        const confirmDelete = confirm(`Are you sure you want to delete customer ${user.name}?`);

      if(confirmDelete){
      const response = await fetch(`http://localhost:8080/api/customers/${customerId}`, {
        method: "DELETE",
        credentials: "include"
      });
    
  
      if (response.ok) {
        toast.success(`${user.username} deleted`)
        await getCustomers();
      } else {
        toast.error("Error")
      }
    }
}


async function updateCustomer() {    

  const data = {
    name: selectedCustomer.name,
    phoneNumber: selectedCustomer.phone_number,
    email: selectedCustomer.email,
    address: selectedCustomer.address,
    nip: selectedCustomer.nip,
    regon: selectedCustomer.regon,
};
      console.log(data)
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${selectedCustomer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast.success(selectedCustomer.name + " edited!");
          modal.hide(); // Close the modal after a successful update
          getCustomers();
        }
      } catch (error) {
          toast.error(error);
      }
  }
  </script>


<Navbar />
<Toaster />

{#if isAdmin}
  <AddCustomer refresh={getCustomers}/>
{/if}

<div class="container">
  <table class="responsive-table">
    <tr class="table-header">
      <th class="col col-1">Name</th>
      <th class="col col-2">Email</th>
      <th class="col col-3">Numer telefonu</th>
      <th class="col col-4">Address</th>
      <th class="col col-5">NIP</th>
      <th class="col col-6">Administracja</th>

    </tr>
    {#if customers.length > 0}
      {#each customers as customer}
        <tr class="table-row">
          <td class="col col-1" data-label="Username">{customer.name}</td>
          <td class="col col-2" data-label="Email">{customer.email}</td>
          <td class="col col-3" data-label="Phone Number">{customer.phone_number}</td>
          <td class="col col-4" data-label="Phone Number">{customer.address}</td>
          <td class="col col-5" data-label="Job Title">{customer.nip}</td>
          <td class="col col-6" data-label="Action">
            {#if isAdmin}
              <button class="delete-btn" on:click={() => deleteCustomer(customer.id)}>Delete</button>
              <button class="edit-btn" on:click={() => { selectCustomer(customer); modal.show(); }}>Edit</button>
            {:else}
              <p>You are not admin</p>
            {/if}
          </td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="5">No customers available</td>
      </tr>
    {/if}
  </table>
</div>

<!-- Edit user -->
<Modal bind:this={modal}>
  {#if selectCustomer}
    <div class="form-container">
      <form on:submit|preventDefault={updateCustomer}>
        <div>
          <h1>{selectedCustomer.name}</h1>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" bind:value={selectedCustomer.name} placeholder="">
        </div>
        <div>
          <label for="phoneNumber">Numer Telefonu:</label>
          <input type="tel" id="phone_number" name="phone_number" bind:value={selectedCustomer.phone_number} placeholder="">
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" bind:value={selectedCustomer.email} placeholder="Enter email">
        </div>

        <div>
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" bind:value={selectedCustomer.address} placeholder="Enter address">
        </div>
        <div>
          <label for="nip">NIP:</label>
          <input type="text" id="nip" name="nip" bind:value={selectedCustomer.nip} placeholder="Enter NIP">
        </div>
        
        <div>
          <label for="regon">REGON:</label>
          <input type="text" id="regon" name="regon" bind:value={selectedCustomer.regon} placeholder="Enter REGON">
        </div>

        <div class="button-wrapper">
          <button type="submit" class="submit-button">Submit</button>
          <button on:click={() => modal.hide()} class="close-button">Close</button>
        </div>
      </form>
    </div>
  {/if}
</Modal>



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
      margin-bottom: 30px;
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
      width: 500px;
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