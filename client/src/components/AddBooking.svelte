<script>
    import Modal from "./Modal.svelte";
    import { Base_URL } from '../stores/global';
    import { onMount } from "svelte";
    import toast, { Toaster } from 'svelte-french-toast';


    export let refresh;
    let modal;

    let booking = {
        booking_start: "",
        booking_end: "",
        price: 0,
        pick_up_location: "",
        details: "",
        customer_id: 0,
        track_id: 0,
  };

    let customers = [];
    let tracks = [];

    onMount(async () => {
      await getCustomers();
      await getTracks();
    });

    async function getCustomers() {
      const response = await fetch($Base_URL + '/customers');
      const { data } = await response.json();
      customers = data;
      console.log(data)
    }

    async function getTracks() {
      const response = await fetch($Base_URL + '/tracks');
      const { data } = await response.json();
      tracks = data; 
      console.log(data)
    }

    async function addBooking() {
    try {
        const response = await fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        });
        if (response.ok) {
            toast.success(`Booking created`);
            setTimeout(() => {
                window.location.reload();
            }, 1000); 
        
        } else {

      const errorData = await response.json();
      const errorMessage = errorData.message || 'An error occurred';

      if (response.status === 409 && errorData.conflictingBookings) {
        // Handle conflicting bookings error
        const conflictingBookings = errorData.conflictingBookings;
        const conflictingBookingsMessage = `Conflicting bookings: ${conflictingBookings.map(booking => `ID: ${booking.id}, Start: ${booking.booking_start}, End: ${booking.booking_end}`).join(', ')}`;
        toast.error(`${errorMessage}. ${conflictingBookingsMessage}`);
        } else {
        // Handle other errors
        toast.error(errorMessage);
      }
    }
    } catch (error) {
        toast.error(error.message);
    }
}



</script>

<Toaster />
<button class="add-button" on:click={() => modal.show()}>Dodaj Booking</button>
<Modal bind:this={modal}>
    <div class="form-container">
      <form on:submit|preventDefault={addBooking}>
        <div>
          <label for="booking_start">Booking Start:</label>
          <!-- <input type="text" id="booking_start" name="booking_start" required bind:value={booking.booking_start}> -->
          <input type="date" id="booking_start" name="booking_start" required bind:value={booking.booking_start}>

        </div>
        <div>
          <label for="booking_end">Booking End:</label>
          <!-- <input type="text" id="booking_end" name="booking_end" required bind:value={booking.booking_end}> -->
          <input type="date" id="booking_end" name="booking_end" required bind:value={booking.booking_end}>

        </div>
        <div>
          <label for="price">Price:</label>
          <input type="number" id="price" name="price" required bind:value={booking.price}>
        </div>
        <div>
          <label for="pick_up_location">Pick-up Location:</label>
          <input type="text" id="pick_up_location" name="pick_up_location" required bind:value={booking.pick_up_location}>
        </div>
        <div>
          <label for="details">Details:</label>
          <input type="text" id="details" name="details" required bind:value={booking.details}>
        </div>
        <div>
          <label for="customer_id">Customer:</label>
          <select id="customer_id" name="customer_id" bind:value={booking.customer_id}>
            {#each customers as customer (customer.id)}
              <option value={customer.id}>{customer.name}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="track_id">Track:</label>
          <select id="track_id" name="track_id" bind:value={booking.track_id}>
            {#each tracks as track (track.id)}
              <option value={track.id}>{track.name}</option>
            {/each}
          </select>
        </div>
  
        <div class="button-wrapper">
          <button type="submit" class="submit-button">Submit</button>
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
