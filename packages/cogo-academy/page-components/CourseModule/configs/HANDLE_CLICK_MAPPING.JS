const HANDLE_CLICK_MAPPING = ({ router }) => ({
	default: (course_id) => {
		router.push(`/learning/course/introduction?course_id=${course_id}`);
	},
	ongoing: (course_id) => {
		router.push(`/learning/course/introduction?course_id=${course_id}`);
	},
	mandatory: (course_id) => {
		router.push(`/learning/course/introduction?course_id=${course_id}`);
	},
	completed: (course_id) => {
		router.push(`/learning/course/introduction?course_id=${course_id}`);
	},
	saved: () => {},
});

export default HANDLE_CLICK_MAPPING;
