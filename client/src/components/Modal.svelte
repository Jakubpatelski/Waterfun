<script>
  let shown = false;
  export function show() {
    shown = true;
  }
  export function hide() {
    shown = false;
  }
</script> 
<style>
  .modal-wrapper {
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto; /* Enable vertical scrolling */

  }

  .modal {
    /* background-color: white; */
    /* max-width: 50vw; */
    /* margin-top: 50px; */
    padding: 1rem;
    /* margin: 5% auto; */
    border-radius: 10px;
  }
  .close {
    float: right;
    cursor: pointer;
  }
  .close:hover {
    font-weight: bold;
  }
  p{
    font-size: 30px;
  }
 
</style>


{#if shown}
  <div class="modal-wrapper">
    <div class="modal">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span class="close" on:click={hide}><p>&times;</p></span>
      <slot />
    </div>
  </div>
{/if}