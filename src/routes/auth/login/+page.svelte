<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

// TODO: use super forms
<h2>Register</h2>
<form action="?/register" method="POST" use:enhance>
	<label for="email">email</label>
	<input name="email" type="email" value={form?.email ?? ''} required />
	<label for="password">password</label>
	<input class="input" name="password" required />
	<button type="submit">Submit</button>
</form>
{#if form?.invalid}<mark>{form?.message}!</mark>{/if}

<h2>Log in</h2>
<form action="?/login" method="POST" use:enhance>
	<label for="email">email</label>
	<input name="email" type="email" value={form?.email ?? ''} required />
	<label for="password">password</label>
	<input name="password" required />
	<button type="submit">Submit</button>
</form>
{#if form?.invalid}<mark>{form?.message}!</mark>{/if}

<p>Forgot your password? <a href="/reset_password">Reset password</a></p>
