<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { invalidate, goto } from '$app/navigation';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	const handleLogin = () => {
		goto('/auth/login');
	};

	initializeStores();
</script>

<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<img src="/jua-icon.png" alt="Jua Board icon" />
				<h3 class="text-lg">Jua Board</h3>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if session}
					<form method="POST" action="auth?/logout">
						<button class="btn btn-sm variant-filled-tertiary">Logout</button>
					</form>
				{:else}
					<button class="btn btn-sm variant-filled-tertiary" on:click={() => handleLogin()}
						>Login</button
					>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">marlinspike dev</svelte:fragment>
</AppShell>
