const COUNT_VALUE = 1;

const notCompletedChapter = (data = {}, indexes = {}, setIndexes = () => {}) => {
	let count = 0;

	const { course_modules = [] } = data || {};

	course_modules.forEach((module, modIndex) => {
		module.course_sub_modules.forEach((subModule, subModIndex) => {
			subModule.course_sub_module_chapters.forEach((chapter, chapIndex) => {
				if (chapter.user_progress_state !== 'completed') {
					count += COUNT_VALUE;
					if (count === COUNT_VALUE) {
						setIndexes({
							moduleIndex    : modIndex,
							subModuleIndex : subModIndex,
							chapterIndex   : chapIndex,
						});
					}
				}
			});
		});
	});

	const { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	return course_modules[moduleIndex]
		?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters[chapterIndex];
};

export default notCompletedChapter;
