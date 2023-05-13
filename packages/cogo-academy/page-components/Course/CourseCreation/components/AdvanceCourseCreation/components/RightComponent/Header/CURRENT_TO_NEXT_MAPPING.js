const CURRENT_TO_NEXT_MAPPING = {
	overview          : 'specifications',
	specifications    : 'course_curriculum',
	course_curriculum : 'course_completion',
	course_completion : 'intended_learners',
	intended_learners : 'publish_course',
};

export default CURRENT_TO_NEXT_MAPPING;
