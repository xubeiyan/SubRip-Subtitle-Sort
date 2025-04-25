<script>
    import DarkModeSwitch from "./components/DarkModeSwitch.svelte";
    import Menu from "./components/Menu.svelte";
    import Index from "./pages/Index.svelte";
    import Sort from "./pages/Sort.svelte";

    let pageState = $state("index");

    let leftTranslate = $derived(pageState == "index" ? false : true);
    let rightTranslate = $derived(pageState == "index" ? false : true);
</script>

<div class="flex flex-col h-screen">
    <nav class="z-10 flex justify-between items-center p-2">
        <Menu {pageState} toSort={() => (pageState = "index")} />
        <DarkModeSwitch mode="light" />
    </nav>
    <main class="grow overflow-x-hidden z-0 flex color-bg">
        <Index
            {leftTranslate}
            {pageState}
            toSort={() => (pageState = "sort")}
        />
        <Sort {rightTranslate} />
    </main>
</div>

<style>
    .color-bg {
        background: url("/index.svg");
        background-position: 40%;
        background-position-y: 40%;
        background-repeat: no-repeat;
    }
</style>
