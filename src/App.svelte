<script>
	import DarkModeSwitch from "./components/DarkModeSwitch.svelte";
	import Menu from "./components/Menu.svelte";
	import Index from "./pages/Index.svelte";
	import Sort from "./pages/Sort.svelte";

	let pageState = $state("index");

	let leftTranslate = $derived(pageState == "index" ? false : true);
	let rightTranslate = $derived(pageState == "index" ? false : true);

	let lightDarkMode = $state('light');

	const switchLightDark = () => {
		if (lightDarkMode == 'light') {
			window.document.documentElement.classList.add('dark');
			lightDarkMode = 'dark';
		} else {
			window.document.documentElement.classList.remove('dark');
			lightDarkMode = 'light';
		}
	}
</script>

<div class="flex flex-col h-screen dark:bg-slate-800">
	<nav class="z-10 flex justify-between items-center p-2">
		<Menu {pageState} toSort={() => (pageState = "index")} />
		<DarkModeSwitch mode={lightDarkMode} toggleMode={switchLightDark} />
	</nav>
	<main
		class="grow overflow-x-hidden z-0 flex
        bg-[url(/index.svg)] dark:bg-[url(/index_dark.svg)] bg-cover bg-center bg-no-repeat"
	>
		<Index
			{leftTranslate}
			{pageState}
			toSort={() => (pageState = "sort")}
		/>
		<Sort {rightTranslate} />
	</main>
</div>