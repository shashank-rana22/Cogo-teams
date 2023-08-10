const WRONG_INDEX_VALUE = -1;

const INITIAL_INDEX_VALUE = 0;

const INDEX_INCREMENT_VALUE = 1;

const getChapter = ({
	data = {},
	indexes,
	state = 'curr',
	setIndexes = () => {},
}) => {
	let { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	const { course_modules = [] } = data || {};

	if (state === 'prev') {
		chapterIndex -= INDEX_INCREMENT_VALUE;

		if (chapterIndex === WRONG_INDEX_VALUE) {
			subModuleIndex -= INDEX_INCREMENT_VALUE;

			if (subModuleIndex === WRONG_INDEX_VALUE) {
				moduleIndex -= INDEX_INCREMENT_VALUE;
				subModuleIndex = (course_modules[moduleIndex]?.course_sub_modules || []).length
					- INDEX_INCREMENT_VALUE;
			}

			chapterIndex = (course_modules[moduleIndex]?.course_sub_modules?.[subModuleIndex]
				?.course_sub_module_chapters.length || []) - INDEX_INCREMENT_VALUE;
		}
	} else if (state === 'next') {
		chapterIndex += INDEX_INCREMENT_VALUE;

		if (
			chapterIndex
			=== course_modules[moduleIndex]?.course_sub_modules?.[subModuleIndex]
				?.course_sub_module_chapters?.length
		) {
			chapterIndex = INITIAL_INDEX_VALUE;
			subModuleIndex += INDEX_INCREMENT_VALUE;

			if (
				subModuleIndex
				=== course_modules[moduleIndex]?.course_sub_modules?.length
			) {
				subModuleIndex = INITIAL_INDEX_VALUE;
				moduleIndex += INDEX_INCREMENT_VALUE;
			}
		}
	}

	setIndexes({
		moduleIndex,
		subModuleIndex,
		chapterIndex,
	});

	const chapterContent = data?.course_modules[moduleIndex]?.course_sub_modules?.[subModuleIndex]
		?.course_sub_module_chapters?.[chapterIndex];

	return chapterContent;
};

export default getChapter;
