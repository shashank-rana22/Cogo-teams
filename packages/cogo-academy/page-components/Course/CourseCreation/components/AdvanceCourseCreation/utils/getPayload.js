import { isEmpty } from '@cogoport/utils';

const chapter_content = ({ values, editorValue }) => {
	const {
		content_type = '',
		upload_video = '',
		upload_presentation = {},
		upload_document = {},
	} = values || {};

	if (content_type === 'text') {
		return editorValue.toString('html');
	}

	if (content_type === 'video') {
		return upload_video;
	}

	if (content_type === 'document') {
		return upload_document.finalUrl;
	}

	return upload_presentation.finalUrl;
};

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
	const {
		upload_file,
		additional_resources_title,
		additional_resources_link,
	} = values || {};

	let chapter_attachments = [];

	if (!additionalResourcesWatch && upload_file) {
		chapter_attachments = [
			{
				media_url : upload_file.finalUrl,
				type      : 'downloadable_resource',
				name      : upload_file.fileName,
			},
		];
	}

	if (additionalResourcesWatch && additional_resources_title && additional_resources_link) {
		chapter_attachments = [
			{
				name      : values.additional_resources_title,
				media_url : values.additional_resources_link,
				type      : 'external_link',
			},
		];
	}

	return {
		...values,
		course_sub_module_id,
		sequence_order             : index + 1,
		chapter_content            : chapter_content({ values, editorValue }),
		additional_resources       : undefined,
		additional_resources_link  : undefined,
		additional_resources_title : undefined,
		upload_video               : undefined,
		upload_presentation        : undefined,
		upload_document            : undefined,
		...(!isNew ? { id: chapterId } : {}),
		...(!isEmpty(chapter_attachments) ? { chapter_attachments } : {}),
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
