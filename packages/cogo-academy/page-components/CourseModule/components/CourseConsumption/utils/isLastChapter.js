const isLastChapter = (data = {}, indexes = {}) => {
	const { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	const modIndex = (data?.course_modules?.length || 0) - 1;
	const subModInd = (data?.course_modules[modIndex]?.course_sub_modules?.length || 0) - 1;
	const chapIndex = (data?.course_modules[modIndex]
		?.course_sub_modules[subModInd]?.course_sub_module_chapters.length || 0) - 1;

	if (moduleIndex === modIndex && subModuleIndex === subModInd && chapterIndex === chapIndex) {
		return true;
	}
	return false;
};

export default isLastChapter;
