<script>
	import LaunchRocketIcon from "../assets/svg-icons/launchRocket.svelte";
	import SaveIcon from "../assets/svg-icons/save.svelte";
	import UploadCloudIcon from "../assets/svg-icons/uploadCloud.svelte";

	import { sortSRTFileByStartTime } from "../lib/utils";

	let { rightTranslate } = $props();

	let wrapperStyle = $derived(rightTranslate ? "translate-x-[-100%]" : "");

	// 可用状态toUploadFile, toSortFile, toDownloadSortedFile
	let stage = $state("toUploadFile");
	let filename = $state(null);
	let fileContent = $state(null);
	let sortedFileContent = $state(null);

	let fileInput = null;

	let selectBtnStyle = $derived(
		stage == "toUploadFile"
			? "left-[50%] top-[50%] translate-[-50%] bg-blue-200"
			: "left-4 bottom-4 bg-blue-300",
	);

	let launchBtnStyle = $derived(stage == "toUploadFile" ? "hidden" : "");
	let downloadBtnStyle = $derived(
		stage == "toDownloadSortedFile" ? "" : "hidden",
	);

	const fileSelect = () => {
		if (fileInput == null) return;
		fileInput.click();
	};

	const handleFileInput = (e) => {
		const [file] = e.target.files;

		filename = file.name;

		const reader = new FileReader();

		reader.addEventListener(
			"load",
			() => {
				stage = "toSortFile";
				fileContent = reader.result;
			},
			false,
		);

		reader.readAsText(file);
	};

	const launch = () => {
		sortedFileContent = sortSRTFileByStartTime(fileContent);
		stage = "toDownloadSortedFile";
	};

	const download = () => {
		const blob = new Blob([sortedFileContent], { type: "text/plain" });
		const a = document.createElement("a");
		a.href = window.URL.createObjectURL(blob);
		a.download = `(sort) ${filename}`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
</script>

<div
	class="shrink-0 w-screen {wrapperStyle} transition-transform duration-300
flex flex-col md:flex-row gap-4 md:gap-[4rem] p-2 md:p-[2rem]"
>
	<div
		class="relative rounded-md h-full w-full flex flex-col gap-2 dark:text-slate-100
     p-2 outline-2 outline-rose-700/50 bg-rose-200/10 dark:bg-rose-950/60"
	>
		{#if filename != null}
			<h1 class="text-center outline-2 rounded-md outline-rose-600/50">
				{filename}
			</h1>
		{/if}
		{#if fileContent != null}
			<textarea class="w-full grow resize-none outline-0"
				>{fileContent}</textarea
			>
		{/if}
		<button
			type="button"
			class="size-[4rem] hover:scale-105 absolute {selectBtnStyle}
    grid place-content-center rounded-md"
			onclick={fileSelect}
		>
			<UploadCloudIcon />
		</button>
		<button
			type="button"
			class="{launchBtnStyle} size-[4rem] hover:scale-105 absolute right-4 bottom-4 
			bg-rose-200
    grid place-content-center rounded-md"
			onclick={launch}
		>
			<LaunchRocketIcon />
		</button>
	</div>
	<div
		class="relative rounded-md h-full w-full flex flex-col gap-2 dark:text-slate-100
        p-2 outline-2 outline-emerald-700/50 bg-emerald-200/10 dark:bg-emerald-950/60"
	>
		{#if sortedFileContent != null}
			<h1 class="text-center outline-2 rounded-md outline-emerald-600/50">
				(sort) {filename}
			</h1>
		{/if}
		{#if sortedFileContent != null}
			<textarea class="w-full grow resize-none outline-0"
				>{sortedFileContent}</textarea
			>
		{/if}

		<button
			type="button"
			class="{downloadBtnStyle} size-[4rem] hover:scale-105 absolute left-4 bottom-4
            bg-green-200 grid place-content-center rounded-md"
			onclick={download}
		>
			<SaveIcon />
		</button>
	</div>
</div>
<input
	type="file"
	accept=".srt"
	class="hidden"
	bind:this={fileInput}
	oninput={handleFileInput}
/>
