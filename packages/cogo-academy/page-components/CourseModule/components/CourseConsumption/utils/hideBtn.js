const LENGTH_INDEX_DIF = 1;

const FIRST_CHAPTER_INDEX = 0;

const hideBtn = (data = {}, btn = '', indexes = {}) => {
	const { course_modules = [] } = data || {};

	const { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	if (btn === 'prev') {
		if ((moduleIndex + subModuleIndex + chapterIndex) === FIRST_CHAPTER_INDEX) {
			return true;
		}
	} else if (btn === 'next') {
		const modIndex = course_modules.length - LENGTH_INDEX_DIF;
		const subModInd = (course_modules[modIndex]?.course_sub_modules || []).length - LENGTH_INDEX_DIF;
		const chapIndex = (course_modules[modIndex]
			?.course_sub_modules[subModInd]?.course_sub_module_chapters.length || []) - LENGTH_INDEX_DIF;

		if (moduleIndex === modIndex && subModuleIndex === subModInd && chapterIndex === chapIndex) {
			return true;
		}
	}
	return false;
};

export default hideBtn;
