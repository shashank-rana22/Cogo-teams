const useGetEducationInfo = (employee_education_details = []) => ((employee_education_details || []).map((detail) => ({
	heading : `${detail.education_level} DETAILS`,
	details : [
		{ label: 'College', key: `${detail.education_level}`, value: 'school_name' },
		{ label: 'Degree', key: `${detail.education_level}`, value: 'degree' },
		{ label: 'Field of study', key: `${detail.education_level}`, value: 'specialization' },
		{ label: 'Graduation date', key: `${detail.education_level}`, value: 'ended_at' },
		{ label: 'Score', key: `${detail.education_level}`, value: 'score' },
		{ label: 'Score type', key: `${detail.education_level}`, value: 'score_type' },
	],
})));

export default useGetEducationInfo;
