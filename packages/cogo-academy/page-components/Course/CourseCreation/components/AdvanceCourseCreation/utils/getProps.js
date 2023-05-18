const getProps = (data = {}) => ({
	overview      : {},
	specification : {
		topics            : (data.faq_topics || []).map((item) => item.id) || [],
		tags              : (data.faq_tags || []).map((item) => item.id) || [],
		course_objectives : (data.course_objectives || []).map((objective) => ({ objective })) || [],
	},
	publish: {
		course_title      : data.name,
		course_categories : (data.course_categories || []).map((category) => category.id),
		thumbnail_url     : data.thumbnail_url,
		description       : data.description,
	},
	audience: {
		course_audience_mappings: data.course_audience_mappings,
	},
	completion: {
		completion_criteria               : data.completion_criteria,
		completion_message                : data.completion_message,
		course_completion_duration        : data.course_completion_duration,
		course_completion_rewards_details : data.course_completion_rewards_details,
		course_certificates               : data.course_certificates || [],
	},
});

export default getProps;
