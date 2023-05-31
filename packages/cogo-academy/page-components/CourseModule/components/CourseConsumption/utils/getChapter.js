const getChapter = ({ data = {}, indexes, which = 'curr', setIndexes = () => {} }) => {
	let { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	if (which === 'prev') {
		chapterIndex -= 1;

		if (chapterIndex === -1) {
			subModuleIndex -= 1;

			if (subModuleIndex === -1) {
				moduleIndex -= 1;
				subModuleIndex = data?.course_modules[moduleIndex - 1]?.course_sub_modules.length - 1;
			}

			chapterIndex = data?.course_modules[moduleIndex]
				?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters.length - 1;
		}
	} else if (which === 'next') {
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

	// if (chapterIndex === data?.course_modules[moduleIndex]
	// 	?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters?.length - 1) {
	// 	chapterIndex = 0;
	// 	subModuleIndex += 1;

	// 	if (subModuleIndex === data?.course_modules[moduleIndex]
	// 		?.course_sub_modules?.length - 1) {
	// 		subModuleIndex = 0;
	// 		moduleIndex += 1;
	// 	}
	// } else if (chapterIndex === -1) {
	// 	subModuleIndex -= 1;

	// 	if (subModuleIndex === -1) {
	// 		moduleIndex -= 1;
	// 		subModuleIndex = data?.course_modules[moduleIndex - 1]?.course_sub_modules.length - 1;
	// 	}

	// 	chapterIndex = data?.course_modules[moduleIndex]
	// 		?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters.length - 1;
	// }

	setIndexes({
		moduleIndex,
		subModuleIndex,
		chapterIndex,
	});

	return (data?.course_modules[moduleIndex]
		?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters[chapterIndex]);
};

export default getChapter;
