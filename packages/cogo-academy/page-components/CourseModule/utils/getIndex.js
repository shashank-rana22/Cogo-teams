const getIndex = ({ redirect_chapter_details, course_modules = [] }) => {
	const {
		redirect_chapter_id = '',
		redirect_module_id = '',
		redirect_sub_module_id = '',
	} = redirect_chapter_details;

	const moduleIndex = course_modules.findIndex((item) => item.id === redirect_module_id);

	const module = moduleIndex !== -1 ? course_modules[moduleIndex] : {};

	const { course_sub_modules = [] } = module || {};

	const subModuleIndex = course_sub_modules.findIndex((item) => item.id === redirect_sub_module_id);

	const subModule = subModuleIndex !== -1 ? course_sub_modules[subModuleIndex] : {};

	const { course_sub_module_chapters = [] } = subModule || {};

	const chapterIndex = course_sub_module_chapters.findIndex((item) => item.id === redirect_chapter_id);

	return {
		moduleIndex,
		subModuleIndex,
		chapterIndex,
	};
};

export default getIndex;
