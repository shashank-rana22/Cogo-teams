const getProps = (data = {}) => ({
	overview      : {},
	specification : {
		topics            : (data.faq_topics || []).map((item) => item.id) || [],
		tags              : (data.faq_tags || []).map((item) => item.id) || [],
		course_objectives : (data.course_objectives || []).map((objective) => ({ objective })) || [],
	},
	pre_publish: {
		name           : data.name,
		thumbnail_url  : data.thumbnail_url,
		description    : data.description,
		instructor_ids : data.instructor_ids,
		level          : data.level,
	},
	audience: {
		course_audience_mappings : data.course_audience_mappings,
		eligible_users           : data.eligible_users,
		cogo_academy_sheets      : data.cogo_academy_sheets || [],
		frequency                : data.frequency,
	},
	completion: {
		tests                             : data.tests,
		completion_criteria               : data.completion_criteria,
		completion_message                : data.completion_message,
		course_completion_duration        : data.course_completion_duration,
		course_completion_rewards_details : data.course_completion_rewards_details,
		course_certificates               : data.course_certificates || [],
	},
});

export default getProps;
