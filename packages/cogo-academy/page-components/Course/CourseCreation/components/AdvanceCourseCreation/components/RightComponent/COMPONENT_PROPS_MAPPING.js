const getProps = (data = {}) => ({
	overview: {},

	specifications: {
		topics            : (data.faq_topics || []).map((item) => item.id) || [],
		tags              : (data.faq_tags || []).map((item) => item.id) || [],
		course_objectives : (data.course_objectives || []).map((objective) => ({ objective })) || [],
	},
	publish_course: {
		course_title      : data.name,
		course_categories : (data.course_categories || []).map((category) => category.id),
	},

});

export default getProps;
