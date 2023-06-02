const GET_LINK_MAPPING = ({ router }) => ({
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
	saved: (course_id) => {
		router.push(`/learning/course/introduction?course_id=${course_id}`);
	},
	introduction: (course_id) => {
		router.push(`/learning/course/introduction?course_id=${course_id}`);
	},
});

export default GET_LINK_MAPPING;
