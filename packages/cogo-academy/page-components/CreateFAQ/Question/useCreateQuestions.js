import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useCreateFaqSet from './hooks/useCreateFaqSets';
import useGetTopicTagList from './hooks/useGetTopicTagList';
import useUpdateFaqSet from './hooks/useUpdateFaqSets';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require, import/no-unresolved
	RichTextEditor = require('react-rte').default;
}

function useCreateQuestions({ data }) {
	const { general } = useSelector((state) => state);
	const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
	const [showModalOnCancel, setShowModalOnCancel] = useState(false);

	const { mode = '', id :questionId = '' } = general.query || {};

	const [questionPreview, setQuestionPreview] = useState(mode || 'create');

	const {
		onSubmit:onSubmitCreateForm,
		onClickPublish,
	} = useCreateFaqSet({ setQuestionPreview, questionPreview, editorValue });

	const { onSubmitUpdatedForm } = useUpdateFaqSet({ setQuestionPreview, editorValue, data });

	const onSubmit = (mode === 'create' && questionId)
		? onSubmitUpdatedForm
		: onSubmitCreateForm;

	const {
		topicOptions, tagOptions, audienceOptions,
		fetchTopics, fetchTags, fetchAudiences,
	} = useGetTopicTagList();

	const {
		handleSubmit,
		formState: { errors },
		control,
		setValue,
	} = useForm();

	return {
		editorValue,
		setEditorValue,
		handleSubmit,
		errors,
		control,
		onSubmit,
		topicOptions,
		tagOptions,
		setValue,
		questionPreview,
		setQuestionPreview,
		onClickPublish,
		showModalOnCancel,
		setShowModalOnCancel,
		audienceOptions,
		fetchTopics,
		fetchTags,
		fetchAudiences,
		RichTextEditor,
	};
}

export default useCreateQuestions;
