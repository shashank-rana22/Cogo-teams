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

function useCreateQuestions({ data, setEditorError }) {
	const { general } = useSelector((state) => state);
	const { mode = '', id :questionId = '' } = general.query || {};

	const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
	const [showModalOnCancel, setShowModalOnCancel] = useState(false);
	const [searchAudience, setSearchAudience] = useState(null);
	const [questionPreview, setQuestionPreview] = useState(mode || 'create');

	const {
		onSubmit: onSubmitCreateForm,
		onClickPublish,
		loading,
	} = useCreateFaqSet({
		setQuestionPreview,
		questionPreview,
		editorValue,
		RichTextEditor,
		setEditorError,
		data,
	});

	const { onSubmitUpdatedForm, loading: updateApiLoading } = useUpdateFaqSet({
		setQuestionPreview,
		editorValue,
		data,
		RichTextEditor,
		setEditorError,
	});

	const onSubmit = (mode === 'create' && questionId)
		? onSubmitUpdatedForm
		: onSubmitCreateForm;

	const apiLoading = (mode === 'create' && questionId)
		? updateApiLoading
		: loading;

	const {
		topicOptions,
		tagOptions,
		audienceOptions: unfilteredAudienceOptions,
		fetchTopics,
		fetchTags,
		fetchAudiences,
		listTopicsLoading,
		listTagsLoading,
		listAudienceLoading,
	} = useGetTopicTagList();

	const handleAudienceSearch = (searchTerm) => {
		setSearchAudience(searchTerm);
	};

	const audienceOptions = (unfilteredAudienceOptions || []).filter((o) => {
		if (typeof searchAudience === 'string') {
			return o.q.toLowerCase().includes(searchAudience.toLowerCase());
		}
		return true;
	});

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
		handleAudienceSearch,
		fetchTopics,
		fetchTags,
		fetchAudiences,
		RichTextEditor,
		listTopicsLoading,
		listTagsLoading,
		listAudienceLoading,
		apiLoading,
	};
}

export default useCreateQuestions;
