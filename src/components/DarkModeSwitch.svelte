<script>
	import SunIcon from "../assets/svg-icons/sun.svelte";
	import MoonIcon from "../assets/svg-icons/moon.svelte";

	let { mode } = $props();
</script>

<button
	type="button"
	class="size-[3rem] flex justify-center items-center rounded-full hover:bg-slate-200"
>
	{#if mode == "light"}
		<SunIcon />
	{:else}
		<MoonIcon />
	{/if}
</button>
