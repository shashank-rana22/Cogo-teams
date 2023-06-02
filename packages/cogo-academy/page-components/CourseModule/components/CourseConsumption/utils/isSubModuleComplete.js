const isSubModuleComplete = (moduleIndex, subModuleIndex, data = {}) => {
	const chapters = data?.course_modules[moduleIndex]
		?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters || [];

	return chapters.every((chapter = {}) => {
		if (chapter.user_progress_state !== 'completed') {
			return false;
		}
		return true;
	});
};

export default isSubModuleComplete;
