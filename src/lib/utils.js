const sortSRTFileByStartTime = (fileContent) => {
	const srtArr = parseSRTFile(fileContent);
	const sortedSRTArr = sortSRTArray(srtArr);
	return arrToContent(sortedSRTArr);
};

// 读取srt文件
const parseSRTFile = (originContent) => {
	const subtitleArray = [];
	const splitArray = originContent.split(/\n\n+|\r\n(?:\r\n)+|\r\r+/);

	splitArray.forEach((block) => {
		const lines = block.split(/\r\n|\r|\n/);
		if (lines.length < 3) return;

		const [_, timeCode, ...rest] = lines;

		const text = rest.join("\n").trim();
		const trimTimeCode = timeCode.trim();

		const times = trimTimeCode.match(
			/(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/
		);
		if (times) {
			const hour = times[1];
			const min = times[2];
			const second = times[3];
			const milsecond = times[4];

			const timeStamp =
				parseInt(hour) * 60 * 60 * 1000 +
				parseInt(min) * 60 * 1000 +
				parseInt(second) * 1000 +
				parseInt(milsecond);

			subtitleArray.push({
				timeStamp,
				timeCode: trimTimeCode,
				text,
			});
		}
	});

	return subtitleArray;
};

// 针对timeStamp排序
const sortSRTArray = (arr) => {
	return arr.toSorted((a, b) => {
		return a.timeStamp > b.timeStamp ? 1 : -1;
	});
};

// 转换为String
const arrToContent = (arr) => {
	return arr
		.map((one, index) => `${index + 1}\n${one.timeCode}\n${one.text}`)
		.join("\n\n");
};

export { sortSRTFileByStartTime };
