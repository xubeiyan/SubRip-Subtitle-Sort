<script>
	let { children, onclick = null } = $props();
</script>

<button
	type="button"
	{onclick}
	class="size-[3rem] flex justify-center items-center rounded-md bg-purple-100/80 hover:scale-110"
>
	{@render children()}
</button>
