const getModulePayload = ({ values, course_id, isNew, nodeIndex, moduleId }) => ({
	...values,
	...(isNew ? { course_id } : { cogo_academy_course_id: course_id, id: moduleId }),
	sequence_order: nodeIndex + 1,
});

const getSubModulePayload = ({ values, course_id, isNew, nodeIndex, subModuleId, course_module_id }) => ({
	...values,
	...(isNew ? { course_module_id } : { cogo_academy_course_id: course_id, id: subModuleId }),
	sequence_order: nodeIndex + 1,
});

const getChapterPayload = ({
	values,
	index,
	isNew,
	course_sub_module_id,
	editorValue,
	chapterId,
	additionalResourcesWatch,
}) => {
	const chapter_attachments = [
		{
			name      : values.additional_resources_title,
			media_url : values.additional_resources_link,
			type      : 'external_link',
		},
	];

	return {
		...values,
		course_sub_module_id,
		sequence_order             : index + 1,
		chapter_content            : editorValue.toString('html'),
		additional_resources       : undefined,
		additional_resources_link  : undefined,
		additional_resources_title : undefined,
		...(!isNew ? { id: chapterId } : {}),
		...(additionalResourcesWatch ? { chapter_attachments } : {}),
	};
};

const MAPPING = {
	module     : getModulePayload,
	sub_module : getSubModulePayload,
	chapter    : getChapterPayload,
};

const getPayload = ({ payloadType, ...restProps }) => {
	const activeFunc = MAPPING[payloadType];

	return activeFunc({ ...restProps });
};

export default getPayload;
