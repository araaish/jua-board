<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.resetForm, {
		resetForm: true
	});
</script>

<div class="flex my-10 justify-center space-x-28">
	<div class="w-1/3 items-center space-y-4">
		<h2>Where should we send you a link to reset your password?</h2>
		<form action="?/reset_password" method="POST" use:enhance>
			<label class="mb-2" for="email">email</label>
			<input
				class="input"
				type="email"
				name="email"
				placeholder="name@domain.com"
				bind:value={$form.email}
				required
			/>
            <br>
			<button class="my-4 btn variant-filled-primary" type="submit">Get password</button>
		</form>
        {#if $message}<mark>{$message}!</mark>{/if}
		{#if $errors._errors}<span class="invalid">{$errors._errors}</span>{/if}
	</div>
</div>
