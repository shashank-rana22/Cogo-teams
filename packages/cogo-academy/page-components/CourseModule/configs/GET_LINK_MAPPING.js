const GET_LINK_MAPPING = ({ course_id, state }) => {
	const MAPPING = {
		default      : `/learning/course/introduction?course_id=${course_id}`,
		ongoing      : `/learning/course/${course_id}`,
		mandatory    : `/learning/course/introduction?course_id=${course_id}`,
		completed    : `/learning/course/${course_id}`,
		saved        : `/learning/course/introduction?course_id=${course_id}`,
		introduction : `/learning/course/introduction?course_id=${course_id}`,
	};

	return MAPPING[state] || MAPPING.default;
};

export default GET_LINK_MAPPING;
