<script>
	import { useNavigate } from "svelte-navigator";
  import { user } from "../stores/userStore";
	import { onMount } from "svelte";
	
  const navigate = useNavigate();

	onMount(() => {
    if (!$user) {
      navigate("/login")
    }
  });
</script>

  {#if $user}
    <slot />
  {/if}