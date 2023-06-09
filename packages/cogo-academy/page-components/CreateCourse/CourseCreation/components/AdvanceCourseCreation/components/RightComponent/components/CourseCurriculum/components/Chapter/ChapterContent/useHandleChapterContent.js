import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getPayload from '../../../../../../../utils/getPayload';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require, import/no-unresolved
	RichTextEditor = require('react-rte').default;
}

const MAPPING = ['name', 'description', 'content_type', 'completion_duration_value', 'completion_duration_unit'];

const FIRST_INDEX = 0;

const useHandleChapterContent = ({ chapterContent, onSaveChapter, subModuleId, index, state }) => {
	const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
	const [assessmentValue, setAssessmentvalue] = useState(RichTextEditor.createEmptyValue());

	const { control, formState:{ errors = {} }, watch, handleSubmit, setValue } = useForm();

	const {
		additional_resources: additionalResourcesWatch,
		content_type: contentTypeWatch,
		upload_video: uploadVideoWatch,
		upload_document: uploadDocumentWatch,
	} = watch();

	const onSubmit = (values) => {
		const { isNew = false } = chapterContent || {};

		const payloadValues = getPayload({
			values,
			course_sub_module_id : subModuleId,
			index,
			editorValue,
			chapterId            : chapterContent.id,
			payloadType          : 'chapter',
			isNew,
			additionalResourcesWatch,
			state,
			assessmentValue,
		});

		onSaveChapter({
			values  : payloadValues,
			chapter : chapterContent,
		});
	};

	useEffect(() => {
		const { content_type, chapter_content, chapter_attachments = [] } = chapterContent || {};

		MAPPING.forEach((item) => {
			if (chapterContent[item] && !isEmpty(chapterContent[item])) {
				setValue(item, chapterContent[item]);
			}
		});

		if (content_type === 'text') {
			setEditorValue(RichTextEditor?.createValueFromString((chapter_content || ''), 'html'));
		} else if (content_type === 'video') {
			setValue('upload_video', chapter_content);
		} else if (content_type === 'presentation') {
			setValue('upload_presentation', chapter_content);
		} else if (content_type === 'assessment') {
			setAssessmentvalue(RichTextEditor?.createValueFromString((chapter_content || ''), 'html'));
		} else {
			setValue('upload_document', chapter_content);
		}

		if (!isEmpty(chapter_attachments)) {
			const { type, media_url } = chapter_attachments[FIRST_INDEX] || {};

			if (type === 'downloadable_resource') {
				setValue('additional_resources', false);
				setValue('upload_file', media_url);
			} else {
				chapter_attachments.filter((item) => item.status === 'active').forEach((item, itemIndex) => {
					const childKey = `external_link.${itemIndex}`;

					setValue(`${childKey}.name`, item.name);
					setValue(`${childKey}.media_url`, item.media_url);
				});
				setValue('additional_resources', true);
			}
		}
	}, [chapterContent, setValue]);

	useEffect(() => {
		const { content_type = [], chapter_content } = chapterContent || {};

		if (content_type !== contentTypeWatch) {
			return;
		}

		if (content_type === 'text') {
			setEditorValue(RichTextEditor?.createValueFromString((chapter_content || ''), 'html'));
		} else if (content_type === 'video') {
			setValue('upload_video', chapter_content);
		} else if (content_type === 'presentation') {
			setValue('upload_presentation', chapter_content);
		} else {
			setValue('upload_document', chapter_content);
		}
	}, [contentTypeWatch, chapterContent, setValue]);

	useEffect(() => {
		const { chapter_attachments = [] } = chapterContent || {};

		if (!isEmpty(chapter_attachments)) {
			const { type, name: additional_resources_title, media_url } = chapter_attachments[FIRST_INDEX] || {};

			if (type === 'downloadable_resource' && !additionalResourcesWatch) {
				setValue('additional_resources', false);
				setValue('upload_file', media_url);
			} else if (type === 'external_link' && additionalResourcesWatch) {
				setValue('additional_resources_title', additional_resources_title);
				setValue('additional_resources_link', media_url);
				setValue('additional_resources', true);
			}
		}
	}, [additionalResourcesWatch, chapterContent, setValue]);

	useEffect(() => {
		if (chapterContent.isNew) {
			setValue('content_type', 'document');
		}
	}, [chapterContent.isNew, setValue]);

	return {
		RichTextEditor,
		onSubmit,
		control,
		errors,
		handleSubmit,
		contentTypeWatch,
		additionalResourcesWatch,
		editorValue,
		setEditorValue,
		uploadVideoWatch,
		uploadDocumentWatch,
		assessmentValue,
		setAssessmentvalue,
	};
};

export default useHandleChapterContent;
