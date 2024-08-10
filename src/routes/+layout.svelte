<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { invalidate, goto } from '$app/navigation';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	import Footer from '../lib/components/Footer.svelte';

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

	const handleHome = () => {
		// if already on home page, refresh
		if (location.pathname === '/') {
			location.reload();
		} else {
			goto('/');
		}
	};

	const handleLogin = () => {
		goto('/auth/login');
	};

	const handleNani = () => {
		goto('/nani');
	};

	initializeStores();
</script>

<Toast />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<img on:click={() => handleHome()} src="/jua-icon.png" alt="Jua Board icon" />
				<h3 on:click={() => handleHome()} class="text-lg">Jua Board</h3>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn btn-sm variant-filled-tertiary" on:click={() => handleNani()}
					>なんですか</button
				>
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
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
