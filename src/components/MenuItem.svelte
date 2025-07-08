<script>
	let { children, onclick = null } = $props();
</script>

<button
	type="button"
	{onclick}
	class="size-[3rem] flex justify-center items-center rounded-md bg-purple-200 dark:bg-purple-700 hover:scale-110"
>
	{@render children()}
</button>
