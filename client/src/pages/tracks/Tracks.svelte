<script>
    import { onMount } from 'svelte';
    import NavbarUser from "../../components/NavbarUser.svelte";
    import Footer from "../../components/Footer.svelte"
    import toast, { Toaster } from 'svelte-french-toast';
    import { Base_URL } from "../../stores/global";

  let tracks = [];
  let selectedTrack = null;

  let formElement;
  let fullName= "";
  let email= "";
  let subject = "";
  let text = "";

    async function handleContact(){
        const data = { fullName, email, subject, text }

        try{
            const response = await fetch($Base_URL + '/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
              toast.success("Email was sent");
          }
       }
        catch(error) {
              toast.error(error);
        }
        formElement.reset();

    }

async function getTracks() {
  const response = await fetch('http://localhost:8080/api/tracks');
  const { data } = await response.json();
  tracks = data;
  console.log(data);
}

onMount(() => {
  getTracks();
});

function selectTrack(track) {
  selectedTrack = track;
}
</script>

<NavbarUser />
<Toaster />


<div>
    <h1 class="page-title">Wynajem</h1>
    <hr />
    <div class="container">
        <aside class="tracks-list">
            {#each tracks as track}
            <button class="track-button" on:click={() => selectTrack(track)}>
                {track.name}
            </button>
            {/each}
        </aside>
    
        <section class="track-detail">
            {#if selectedTrack}
            <img class="selected-track-image" src={selectedTrack.img} alt={selectedTrack.name} />
            <h1>{selectedTrack.name}</h1>
            <p>{selectedTrack.description}</p>     
            {/if}
        </section>


    </div>
    <hr>

    <div class="message-center">
      <h1>Checesz wynająć track? Zadzwń pod numer +48 501 602 321</h1>
      <h1>Bądz skontaktuj sie z nami mailowo uywając fomularza poniżej</h1>
    </div>

    <div>
      <form  bind:this={formElement} on:submit|preventDefault={handleContact}  class="contact-form">
        <label for="fullName" >Imię i Nazwisko</label>
        <input type="text" id="fullName" name="fullName"  required bind:value={fullName}>
          <label for="email" >Email</label>
          <input type="email" id="email" name="email"  required bind:value={email}>
        
          <label for="subject">Temat</label>
          <input type="text" id="subject" name="subject" required bind:value={subject}>
        
          <label for="message">Message</label>
          <textarea id="message" name="message" required bind:value={text} rows="5" cols="5"></textarea>
        
          <button class="submit"  type="submit">WYŚLIJ WIADOMOŚĆ</button>
      </form>
    </div>



</div>

<Footer />

<style>
    .container {
  display: grid;
  grid-template-columns: 1fr 3fr; /* Sidebar takes 1 fraction, details take 3 */
  gap: 20px;
  margin: 20px;
}

.tracks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.track-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.track-button {
  font-size: 1.1rem;
  padding: 15px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  border-radius: 8px;
}

.track-button:hover {
  background-color: #e9e9e9;
}

.selected-track-image {
  max-width: 100%;
  height: auto;
}

@media (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
  }
  .track-detail {
    order: -1; 
  }
}

.page-title {
  text-align: center; 
  margin: 3%; 

}


hr {
  border: none; 
  height: 2px; 
  background-color:#D3E5FF; 
  width: 100%; 
  margin-top: 0; 
}

.contact-form {
    display: flex;
    flex-direction: column;
    padding: 40px;
    background-color: rgb(252, 241, 225);
    margin: 2% 30%;
    border-radius: 20px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

.submit {
  padding: 15px;
  font-size: 16px;
  letter-spacing: 0.6px;
  background-color: #007bff;

  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.message-center{
  text-align: center;
  background-color: #eaedf0;
  margin: 2% 20%;
  padding: 20px;
  border-radius: 20px;

}


</style>