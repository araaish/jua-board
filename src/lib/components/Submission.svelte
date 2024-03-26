<script>
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();
	export let userInput = '';
	export let submission = writable('');

	const handleSubmit = () => {
		submission.set(userInput);
		dispatch('submit', userInput);
	};
</script>

<!-- Submission container -->
<div class="flex flex-col space-y-2">
	<!-- Text input card -->
	<div class="card p-4">
		<textarea
			class="textarea"
			rows="4"
			placeholder="Enter your message (limit X characters)"
			bind:value={userInput}
		></textarea>
	</div>
	<div class="flex justify-end">
		<button class="btn btn-sm variant-filled-primary" on:click={handleSubmit}
			>Submit</button
		>
	</div>
</div>
