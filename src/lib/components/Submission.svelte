<script>
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { MAX_CHARACTER_COUNT } from '$lib/constants';

	const dispatch = createEventDispatcher();
	export let userInput = '';
	export let submission = writable('');

	const handleSubmit = () => {
		submission.set(userInput);
		dispatch('submit', userInput);
	};


	const charCount = writable(0);
	$: $charCount = userInput.length;
	$: $charCount = $charCount > MAX_CHARACTER_COUNT ? MAX_CHARACTER_COUNT : $charCount;

</script>

<!-- Submission container -->
<div class="flex flex-col space-y-2">
	<!-- Text input card -->
	<div class="card p-4">
		<textarea
			maxlength="{MAX_CHARACTER_COUNT}"
			class="textarea"
			rows="4"
			placeholder="Enter your message (limit {MAX_CHARACTER_COUNT} characters)"
			bind:value={userInput}
		></textarea>
	</div>
	<div class="flex justify-end">
		<p class="text-xs">character count: {$charCount}/{MAX_CHARACTER_COUNT}</p>
	</div>
	<div class="flex justify-end">
		<button class="btn btn-sm variant-filled-primary" on:click={handleSubmit}
			>Submit</button
		>
	</div>
</div>
