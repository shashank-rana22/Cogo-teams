const isSubModuleComplete = (moduleIndex, subModuleIndex, data = {}) => {
	const { course_modules = [] } = data || {};

	const chapters = course_modules[moduleIndex]?.course_sub_modules[subModuleIndex]?.course_sub_module_chapters || [];

	return chapters.every((chapter = {}) => chapter.user_progress_state === 'completed');
};

export default isSubModuleComplete;
