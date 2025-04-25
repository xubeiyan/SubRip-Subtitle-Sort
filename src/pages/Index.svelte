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
	class="relative w-screen shrink-0 overflow-y-auto {wrapperStyle} transition-transform duration-300"
>
	<section
		class="h-full flex flex-col gap-4 md:gap-[8rem] justify-center items-center"
	>
		<h1 class="text-2xl md:text-6xl text-orange-400">
			SubRip Subtitle Sort
		</h1>
		<div>
			<button
				type="button"
				class="bg-purple-400 hover:outline-2 outline-purple-500 rounded-md px-4 py-2 text-white mr-4"
				onclick={toSort}>开始</button
			>

			<button
				type="button"
				class="outline outline-orange-500/80 hover:outline-2 hover:outline-orange-500
        text-orange-600
        rounded-md px-4 py-2"
				onclick={scrollToMore}>了解更多</button
			>
		</div>
	</section>
	<section
		id="more"
		class="h-full flex flex-col gap-4 md:gap-[2rem] justify-center items-center p-2"
	>
		<h1 class="text-orange-500 text-xl md:text-4xl">
			使用 Svelte 框架开发的 SubRip 字幕重排工具
		</h1>
        <p class="text-balance text-center">旨在解决当 VLC 等播放器不能识别乱序排列字幕的 SubRip 文件(.srt)，又不想启动 Aegisub 来调整的时候...</p>
		<a
			target="_blank"
			href="https://github.com/xubeiyan/SubRip-Subtitle-Sort"
		>
			<button
				class="rounded-lg bg-orange-800/10 size-[3em] p-2 md:size-[7rem]
        flex justify-center items-center"
			>
				<GithubIcon />
			</button>
		</a>
	</section>
</div>
{#if showScrollToTop}
	<button
		class="size-[3rem] absolute right-4 bottom-4 hover:bg-slate-100 rounded-xl
flex justify-center items-center"
		onclick={scrollToTop}
	>
		<ArrowUpIcon />
	</button>
{/if}
