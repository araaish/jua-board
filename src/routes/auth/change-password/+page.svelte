<script lang="ts">
    import EyeIcon from 'virtual:icons/mdi/eye';
	import EyeOffIcon from 'virtual:icons/mdi/eye-off';
    import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.changePasswordForm, {
		resetForm: true
	});

    let showPassword = false;
	$: passwordType = showPassword ? 'text' : 'password';
</script>

<div class="flex my-10 justify-center space-x-28">
	<div class="flex-col w-1/3 items-center space-y-4">
        <h2 class="h2">Change your password</h2>
        <form action="?/change_password" method="POST" use:enhance>   
            <label class="mb-2" for="new_password">New password</label>
			<input {...{ type: passwordType }}
				class="input w-2/3"
				name="newPassword"
				bind:value={$form.newPassword}
				required
			/>
            <label class="mb-2" for="confirm_password">Confirm new password</label>
            <input {...{ type: passwordType }}
                class="mr-2 input w-2/3"
                name="confirmPassword"
                bind:value={$form.confirmPassword}
                required
            />
            {#if showPassword}
                <button type="button" on:click={() => (showPassword = false)}>
                    <EyeIcon />
                </button>
            {:else}
                <button type="button" on:click={() => (showPassword = true)}>
                    <EyeOffIcon />
                </button>
            {/if}
            <br>
			<button class="my-4 btn variant-filled-primary" type="submit">Change password</button>
        </form>
        {#if $message}<mark>{$message}!</mark>{/if}
		{#if $errors._errors}<span class="invalid">{$errors._errors}</span>{/if}
    </div>
</div>