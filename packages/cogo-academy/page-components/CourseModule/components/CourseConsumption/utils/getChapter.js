const getChapter = ({ data = {}, indexes, state = 'curr', setIndexes = () => {}, setChapterContent = () => {} }) => {
	let { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	console.log('indexes', indexes);
	console.log('state', state);

	if (state === 'prev') {
		chapterIndex -= 1;

		if (chapterIndex === -1) {
			subModuleIndex -= 1;

			if (subModuleIndex === -1) {
				moduleIndex -= 1;
				subModuleIndex = (data?.course_modules[moduleIndex - 1]?.course_sub_modules.length || 0) - 1;
			}

			chapterIndex = (data?.course_modules[moduleIndex]
				?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters.length || 0) - 1;
		}
	} else if (state === 'next') {
		chapterIndex += 1;

		if (chapterIndex === data?.course_modules[moduleIndex]
			?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters?.length) {
			chapterIndex = 0;
			subModuleIndex += 1;

			if (subModuleIndex === data?.course_modules[moduleIndex]
				?.course_sub_modules?.length) {
				subModuleIndex = 0;
				moduleIndex += 1;
			}
		}
	}

	setIndexes({
		moduleIndex,
		subModuleIndex,
		chapterIndex,
	});

	const chapterContent = data?.course_modules[moduleIndex]
		?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters[chapterIndex];

	if (state !== 'curr') {
		setChapterContent(chapterContent);
	}

	return chapterContent;
};

export default getChapter;
