<script>
	import ArrowUpIcon from "../assets/svg-icons/arrowUp.svelte";
	import GithubIcon from "../assets/svg-icons/github.svelte";

	let { leftTranslate, pageState, toSort } = $props();

	let wrapperStyle = $derived(leftTranslate ? "translate-x-[-100%]" : "");

	let wrapper = null;

	const scrollToMore = () => {
		document.querySelector("#more").scrollIntoView({ behavior: "smooth" });
	};

	const scrollToTop = () => {
		wrapper.scroll({ top: 0, behavior: "smooth" });
	};

	let showScrollToTop = $state(false);
	const handleScroll = (e) => {
		showScrollToTop = e.target.scrollTop == 0 ? false : true;
	};
</script>

<div
	bind:this={wrapper}
	onscroll={handleScroll}
	class="relative w-screen shrink-0 overflow-y-auto {wrapperStyle} 
	transition-transform duration-300 snap-normal snap-y snap-mandatory overflow-y-hidden"
>
	<section
		class="h-full flex flex-col justify-center items-center
		snap-start"
	>
		<h1 class="text-2xl md:text-6xl text-orange-400 dark:text-orange-100">
			SubRip Subtitle Sort
		</h1>
		<div class="mt-[4rem]">
			<button
				type="button"
				class="bg-purple-200 dark:bg-purple-800 hover:outline-2 outline-purple-300 rounded-md px-4 py-2
					text-purple-700 dark:text-white mr-4"
				onclick={toSort}>开始</button
			>

			<button
				type="button"
				class="outline outline-orange-500/80 dark:outline-orange-100 hover:outline-2
				hover:outline-orange-500 dark:hover:outline-orange-100
        text-orange-600 dark:text-orange-100
        rounded-md px-4 py-2 mr-4"
				onclick={scrollToMore}>了解更多</button
			>
			<a href="./example.srt" download="example.srt">
				<button
					type="button"
					class="cursor-pointer
				rounded-md py-2 text-gray-500 dark:text-gray-200 underline-offset-4 hover:underline"
					>下载测试文件</button
				>
			</a>
		</div>
	</section>
	<section
		id="more"
		class="h-full flex flex-col gap-4 md:gap-[2rem] justify-center items-center p-2
		snap-start"
	>
		<h1 class="text-orange-500 dark:text-orange-100 text-xl md:text-4xl">
			使用 Svelte 框架开发的 SubRip 字幕重排工具
		</h1>
		<p class="text-balance text-center dark:text-orange-200">
			旨在解决当 VLC 等播放器不能识别乱序排列字幕的 SubRip
			文件(.srt)，又不想启动 Aegisub 来调整的时候...
		</p>
		<a
			target="_blank"
			href="https://github.com/xubeiyan/SubRip-Subtitle-Sort"
		>
			<button
				class="rounded-lg bg-slate-100 dark:bg-slate-950 size-[3em] p-2 md:size-[7rem]
        flex justify-center items-center cursor-pointer"
			>
				<GithubIcon />
			</button>
		</a>
	</section>
</div>
{#if showScrollToTop}
	<button
		class="size-[3rem] absolute right-4 bottom-4 
		hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600
		rounded-xl
flex justify-center items-center"
		onclick={scrollToTop}
	>
		<ArrowUpIcon />
	</button>
{/if}
