<script>
      import { onMount } from 'svelte';
      import NavbarUser from "../../components/NavbarUser.svelte";
      import Footer from "../../components/Footer.svelte"


let tracks = [];
let selectedTrack = null;

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

    <h1>Checesz wynająć track? Zadzwóń pod numer +48 501 602 321</h1>
    <h1>badz skontaktuj sie z nami mailowo</h1>


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
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
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


</style>