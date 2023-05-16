const getProps = (data = {}) => ({
	overview: {},

	specification: {
		topics            : (data.faq_topics || []).map((item) => item.id) || [],
		tags              : (data.faq_tags || []).map((item) => item.id) || [],
		course_objectives : (data.course_objectives || []).map((objective) => ({ objective })) || [],
	},
	publish: {
		course_title      : data.name,
		course_categories : (data.course_categories || []).map((category) => category.id),
	},
	audience: {
		faq_audiences: data.faq_audiences,
	},
});

export default getProps;
