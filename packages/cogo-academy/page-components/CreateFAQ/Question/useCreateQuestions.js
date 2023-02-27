import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useCreateFaqSet from './hooks/useCreateFaqSets';
import useGetTopicTagList from './hooks/useGetTopicTagList';
import useUpdateFaqSet from './hooks/useUpdateFaqSets';

function useCreateQuestions({ data }) {
	const { general } = useSelector((state) => state);
	const [editorValue, setEditorValue] = useState('');
	const [showModalOnCancel, setShowModalOnCancel] = useState(false);
	const [searchAudience, setSearchAudience] = useState(null);

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

	const { topicOptions, tagOptions, audienceOptions: unfilteredAudienceOptions } = useGetTopicTagList();

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
	};
}

export default useCreateQuestions;
