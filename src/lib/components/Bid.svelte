<script>
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    function sendBidEvent() {
        dispatch('bid');
    }
</script>

<div class="flex-1 md:w-full p-4">
	<!-- Bid button -->
	<button type="button" class="btn btn-md variant-filled-secondary" on:click={sendBidEvent}>Bid</button>
</div>
