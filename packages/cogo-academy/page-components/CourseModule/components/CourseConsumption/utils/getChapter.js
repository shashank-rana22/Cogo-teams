const getChapter = ({ data = {}, indexes }) => {
	const { moduleIndex, subModuleIndex, chapterIndex } = indexes;

	return (data[moduleIndex]
		?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters[chapterIndex]);
};

export default getChapter;
