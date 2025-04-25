<script>
	let { toSort, pageState } = $props();
	import GithubIcon from "../assets/svg-icons/github.svelte";
	import HomeIcon from "../assets/svg-icons/home.svelte";
	import MenuIcon from "../assets/svg-icons/menu.svelte";
	import MenuItem from "./MenuItem.svelte";

	let menuPop = $state(false);
	let menuBtnStyle = $derived(menuPop ? "bg-purple-100" : "");
	let menuStyle = $derived(menuPop ? "" : "hidden");

	const toggleMenu = () => (menuPop = !menuPop);

	const closeMenuAndToSort = () => {
		toSort();
		toggleMenu();
	};
</script>

<div class="relative flex items-center">
	<button
		class="size-[3rem] flex justify-center items-center {menuBtnStyle} hover:bg-purple-200 rounded-md"
		onclick={toggleMenu}
	>
		<MenuIcon />
	</button>
	{#if pageState == "sort"}
		<span class="pl-4 text-orange-400">SubRip Subtitle Sort</span>
	{/if}
	<div
		class="mt-2 absolute left-0 top-[100%] {menuStyle} rounded-md flex items-center flex-col gap-2 w-[3em]"
	>
		<MenuItem onclick={closeMenuAndToSort}><HomeIcon /></MenuItem>
		<a
			target="_blank"
			href="https://github.com/xubeiyan/SubRip-Subtitle-Sort"
		>
			<MenuItem onclick={toggleMenu}>
				<GithubIcon small={true} />
			</MenuItem>
		</a>
	</div>
</div>
