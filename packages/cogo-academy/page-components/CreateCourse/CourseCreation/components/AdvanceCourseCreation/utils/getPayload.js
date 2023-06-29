import { isEmpty } from '@cogoport/utils';

const INDEX_TO_VALUE_DIFF = 1;

const getChapterContent = ({ values, editorValue, assessmentValue }) => {
	const {
		content_type = '',
		upload_video = '',
		upload_presentation = {},
		upload_document = {},
	} = values || {};

	if (content_type === 'text') {
		return editorValue.toString('html');
	}

	if (content_type === 'assessment') {
		return assessmentValue.toString('html');
	}

	if (content_type === 'video') {
		return upload_video;
	}

	if (content_type === 'document') {
		return upload_document.finalUrl || upload_document;
	}

	return upload_presentation.finalUrl || upload_presentation;
};

const getModulePayload = ({ values, course_id, isNew, nodeIndex, moduleId, action_type }) => {
	if (action_type === 'delete') {
		return {
			id     : moduleId,
			status : 'inactive',
		};
	}

	return {
		...values,
		...(isNew ? { course_id } : { cogo_academy_course_id: course_id, id: moduleId }),
		sequence_order: nodeIndex + INDEX_TO_VALUE_DIFF,
	};
};

const getSubModulePayload = ({ values, course_id, isNew, nodeIndex, subModuleId, course_module_id, action_type }) => {
	if (action_type === 'delete') {
		return {
			id     : subModuleId,
			status : 'inactive',
		};
	}

	return {
		...values,
		...(isNew ? { course_module_id } : { cogo_academy_course_id: course_id, id: subModuleId }),
		sequence_order: nodeIndex + INDEX_TO_VALUE_DIFF,
	};
};

const getChapterPayload = ({
	values,
	index,
	isNew,
	course_sub_module_id,
	editorValue,
	chapterId,
	additionalResourcesWatch,
	action_type,
	state,
	assessmentValue,
}) => {
	if (action_type === 'delete') {
		return {
			id     : chapterId,
			status : 'inactive',
		};
	}

	const {
		upload_file,
		completion_duration_value = '',
		external_link = [],
	} = values || {};

	let chapter_attachments = [];

	if (!additionalResourcesWatch && upload_file) {
		chapter_attachments = [
			{
				media_url : upload_file.finalUrl || upload_file,
				type      : 'downloadable_resource',
				name      : upload_file.fileName,
				status    : 'active',
			},
		];
	}

	if (additionalResourcesWatch) {
		chapter_attachments = [];

		external_link.forEach((item) => {
			if (!isEmpty(item.media_url)) {
				chapter_attachments.push({ ...item, type: 'external_link', status: 'active' });
			}
		});
	}

	return {
		...values,
		course_sub_module_id,
		sequence_order            : index + INDEX_TO_VALUE_DIFF,
		chapter_content           : getChapterContent({ values, editorValue, assessmentValue }),
		completion_duration_value : Number(completion_duration_value),
		additional_resources      : undefined,
		upload_video              : undefined,
		upload_presentation       : undefined,
		upload_document           : undefined,
		assessment_value          : undefined,
		external_link             : undefined,
		...(!isNew ? { id: chapterId } : {}),
		...(!isEmpty(chapter_attachments) ? { chapter_attachments } : {}),
		...(state === 'published' ? { is_updated: true } : {}),
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
