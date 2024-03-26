<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	function sendWagerEvent() {
		dispatch('wager');
	}
</script>

<div class="flex-1 md:w-full p-4">
	<!-- Wager button -->
	<button type="button" class="btn btn-md variant-filled-secondary" on:click={sendWagerEvent}
		>Wager</button
	>
</div>
