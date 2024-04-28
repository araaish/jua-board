<script lang="ts">
	import EyeIcon from 'virtual:icons/mdi/eye';
	import EyeOffIcon from 'virtual:icons/mdi/eye-off';
	import GitHubIcon from 'virtual:icons/mdi/github';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { OAUTH_PROVIDER } from '$lib/constants';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.loginForm, {
		resetForm: true
	});

	const {
		form: registerForm,
		errors: registerErrors,
		enhance: registerEnhance,
		message: registerMessage
	} = superForm(data.registerForm, {
		resetForm: true
	});

	const {
		form: oauthLoginForm,
		errors: oauthLoginErrors,
		enhance: oauthLoginEnhance,
		message: oauthLoginMessage
	} = superForm(data.oauthLoginForm, {
		resetForm: true
	});

	let showLoginPassword = false;
	let showRegisterPassword = false;
	$: loginPasswordType = showLoginPassword ? 'text' : 'password';
	$: registerPasswordType = showRegisterPassword ? 'text' : 'password';
</script>

<div class="flex my-10 justify-center space-x-28">
	<div class="flex-col w-1/3 items-center space-y-4">
		<h2 class="h2">Register</h2>
		<form id="register" action="?/register" method="POST" use:registerEnhance>
			<label for="email">email</label>
			<input
				class="input w-3/4"
				name="email"
				type="email"
				bind:value={$registerForm.email}
				required
			/>
			<label class="mt-2" for="password">password</label>
			<input {...{ type: registerPasswordType }}
				class="input w-3/4"
				name="password"
				bind:value={$registerForm.password}
				required
			/>
			<label class="mt-2" for="confirmPassword">confirm password</label>
			<input {...{ type: registerPasswordType }}
				class="input w-3/4"
				name="confirmPassword"
				bind:value={$registerForm.confirmPassword}
				required
			/>
			{#if showRegisterPassword}
				<button type="button" on:click={() => (showRegisterPassword = false)}>
					<EyeIcon />
				</button>
			{:else}
				<button type="button" on:click={() => (showRegisterPassword = true)}>
					<EyeOffIcon />
				</button>
			{/if}
			<br />
			<button class="my-4 btn variant-filled-primary" type="submit">Submit</button>
		</form>
		{#if $registerMessage}<mark>{$registerMessage}!</mark>{/if}
		{#if $registerErrors._errors}<span class="invalid">{$registerErrors._errors}</span>{/if}
	</div>
	<div class="flex-col w-1/3 items-center space-y-4">
		<h2 class="h2">Log in</h2>
		<form id="login" action="?/login" method="POST" use:enhance>
			<label for="email">email</label>
			<input class="input w-3/4" name="email" type="email" value={$form.email} required />
			<label class="mt-2" for="password">password</label>
			<input {...{ type: loginPasswordType }}
				class="input w-3/4"
				name="password"
				bind:value={$form.password}
				required
			/>
			{#if showLoginPassword}
				<button type="button" on:click={() => (showLoginPassword = false)}>
					<EyeIcon />
				</button>
			{:else}
				<button type="button" on:click={() => (showLoginPassword = true)}>
					<EyeOffIcon />
				</button>
			{/if}
			<br />
			<button class="my-4 btn variant-filled-primary" type="submit">Submit</button>
		</form>
		{#if $message}<mark>{$message}!</mark>{/if}
		{#if $errors._errors}<span class="invalid">{$errors._errors}</span>{/if}
		
		<form method="POST" action="?/oauthLogin" use:oauthLoginEnhance>
			<button class="mt-2 btn variant-filled-tertiary" name="provider" value={OAUTH_PROVIDER}>
				<span><GitHubIcon/></span>
				<span>Login with GitHub</span>
			</button>
		</form>

		<p>Forgot your password? <a href="/auth/reset-password"><u>Reset password</u></a></p>
	</div>
</div>
