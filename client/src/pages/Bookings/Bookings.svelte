<script>

    import Navbar from "../../components/Navbar.svelte";
    import { onMount } from "svelte";
    import { Base_URL } from '../../stores/global.js';
    import { user } from "../../stores/userStore";
    import AddBooking from "../../components/AddBooking.svelte";
    import toast, { Toaster } from 'svelte-french-toast';
    import Modal from "../../components/Modal.svelte";


    let modal;

    const isAdmin = $user.message.isAdmin;

    let bookings = [];
    let tracks = [];

    let selectedBooking = null;

    function selectBooking(booking) {
        selectedBooking = booking;
    }

    onMount(async () => {
      await getBookings();
      await getTracks();
    });

    async function getBookings() {
      const response = await fetch($Base_URL + '/bookings');
      const { data } = await response.json();
      bookings = data;
      console.log(bookings);
    }

    async function getTracks() {
      const response = await fetch($Base_URL + '/tracks');
      const { data } = await response.json();
      tracks = data; 
      console.log(data)
    }


    async function updateBooking() {    

    let booking = {
        booking_start: selectedBooking.booking_start,
        booking_end: selectedBooking.booking_end,
        price: selectedBooking.price,
        pick_up_location: selectedBooking.pick_up_location,
        details: selectedBooking.details,
        track_id: selectedBooking.track_id,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${selectedBooking.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        toast.success("Booking edited!");
        setTimeout(() => {
            window.location.reload();
        }, 1000); 
      }
    } catch (error) {
        toast.error(error);
    }
}

    async function deleteBooking(bookingId){
      const confirmDelete = confirm(`Are you sure you want to delete booking?`);

      if(confirmDelete){
        const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
          method: "Delete",
          credentials: "include"
        });

        if(response.ok){
          toast.success(`Booking deleted`);
          await getBookings();
        }  else {
          toast.error("Error");
        }

      }

    }




</script>
<Navbar />
<AddBooking  refresh={getBookings}/>
<div class="container">
    <table class="responsive-table">
      <tr class="table-header">
        <th class="col col-1">ID</th>
        <th class="col col-2">Customer Name</th>
        <th class="col col-3">Track</th>
        <th class="col col-4">Start date</th>
        <th class="col col-5">End Date</th>
        <th class="col col-6">Administracja</th>
  
      </tr>
      {#if bookings.length > 0}
        {#each bookings as booking}
          <tr class="table-row">
            <td class="col col-1" data-label="Username">{booking.id}</td>

            <td class="col col-1" data-label="Username">{booking.customer.name}</td>
            <td class="col col-2" data-label="Email">{booking.track.name}</td>
            <td class="col col-3" data-label="Phone Number">{booking.booking_start}</td>
            <td class="col col-4" data-label="Phone Number">{booking.booking_end}</td>
            <td class="col col-6" data-label="Action">
              {#if isAdmin}
                <button class="delete-btn" on:click={() => deleteBooking(booking.id)}>Delete</button>
                <button class="edit-btn" on:click={() => { selectBooking(booking); modal.show(); }}>Edit</button>

              
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


  <Modal bind:this={modal}>
    <div class="form-container">
      <form on:submit|preventDefault={updateBooking}>
        <div>
          <label for="booking_start">Booking Start:</label>
          <input type="date" id="booking_start" name="booking_start" required bind:value={selectedBooking.booking_start}>
        </div>
        <div>
          <label for="booking_end">Booking End:</label>
          <input type="date" id="booking_end" name="booking_end" required bind:value={selectedBooking.booking_end}>
        </div>

        <div>
            <label for="price">Price:</label>
            <input type="number" id="price" name="price" required bind:value={selectedBooking.price}>
          </div>
          <div>
            <label for="pick_up_location">Pick-up Location:</label>
            <input type="text" id="pick_up_location" name="pick_up_location" required bind:value={selectedBooking.pick_up_location}>
          </div>
          <div>
            <label for="details">Details:</label>
            <input type="text" id="details" name="details" required bind:value={selectedBooking.details}>
          </div>
          <div>
            <label for="">Track:</label>
          <select id="track_id" name="track_id" bind:value={selectedBooking.track_id}>
            {#each tracks as track (track.id)}
              <option value={track.id} selected={track.id === selectedBooking.track.id}>{track.name}</option>
            {/each}
          </select>
        </div>
        <div class="button-wrapper">
          <button type="submit" class="submit-button">Update</button>
          <button on:click={() => modal.hide()} class="close-button">Close</button>
        </div>
      </form>
    </div>
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
        max-width: 400px;
        margin: 0 auto;
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
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