<script lang="ts">
	import Bid from '$lib/components/Bid.svelte';
	import Message from '$lib/components/Message.svelte';
	import Submission from '$lib/components/Submission.svelte';
	import Wager from '$lib/components/Wager.svelte';
	import Placeholder from '$lib/components/Placeholder.svelte';

	type inputModeType = 'wager' | 'bid' | 'none';
	let inputMode: inputModeType = 'none';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	const handleWager = () => {
		inputMode = 'wager';
	};

	const handleBid = () => {
		inputMode = 'bid';
	};

	async function handleSubmit(event: any) {
		const userInput = event.detail;
		const uuid = data.userInfo?.id;
		if (inputMode === 'wager') {
			const { data, error } = await supabase.from('wagers').upsert([
				{
					id: uuid,
					message_prediction: userInput,
					created_at: new Date(),
				},
			]);
			if (error) {
				console.error('Error submitting wager:', error);
			}
		} else if (inputMode === 'bid') {
			const { data, error } = await supabase.from('bids').insert([
				{
					id: uuid,
					message: userInput,
					created_at: new Date(),
				},
			]);
			if (error) {
				console.error('Error submitting bid:', error);
			}
		}
		inputMode = 'none';
	};
</script>

<div class="container h-full mx-auto flex justify-evenly items-center">
	<div class="flex flex-col md:flex-row w-full">
		<!-- Left section -->
		<div class="flex-1 md:w-1/2 p-4">
			<!-- Message of the day -->
			<h2 class="text-xl font-bold mb-4">Daily Message</h2>
			<Message value={data.daily_message} />
		</div>
		<!-- Right section -->
		<div class="flex flex-col md:w-1/2 p-4">
			<!-- Submission container Only show once wage button is clicked -->
			{#if session}
				{#if inputMode === 'wager' || inputMode === 'bid'}
					<Submission on:submit={handleSubmit} />
				{:else}
					<Placeholder />
				{/if}
				<div class="h-1/4">
					<Wager on:wager={handleWager} />
					<Bid on:bid={handleBid} />
				</div>
			{:else}
				<p class="text-center">Please login to place a bid on tomorrow's message</p>
			{/if}
		</div>
	</div>
</div>
