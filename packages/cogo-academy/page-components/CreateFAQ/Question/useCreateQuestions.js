import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import createQuestionControls from '../utils/createQuestionControls';

import useCreateFaqSet from './hooks/useCreateFaqSets';
import useGetTopicTagList from './hooks/useGetTopicTagList';
import useListCogoEntity from './hooks/useListCogoEntities';

function useCreateQuestions() {
	const { general } = useSelector((state) => state);
	const { mode = '' } = general.query || {};

	const [editorValue, setEditorValue] = useState('');
	const [questionPreview, setQuestionPreview] = useState(mode || 'create');

	const {
		onSubmit,
		onClickPublish,
	} = useCreateFaqSet({ setQuestionPreview, questionPreview, editorValue });

	const { topicOptions, tagOptions } = useGetTopicTagList();

	const { handleSubmit, formState: { errors }, control, watch, getValues } = useForm();

	const watchFunctions = watch();

	const getArray = getValues('fieldArray');

	const { listCogoEntities, entity_data } = useListCogoEntity();

	useEffect(() => {
		listCogoEntities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const entity_options = [];

	entity_data.map((entityData) => {
		const { business_name = '', id = '' } = entityData || {};
		const asdfgh = {
			label : business_name,
			value : id,
		};
		entity_options.push(asdfgh);
		return entity_options;
	});

	const controls = createQuestionControls({ watchFunctions, entity_options });

	return {
		editorValue,
		setEditorValue,
		handleSubmit,
		errors,
		control,
		onSubmit,
		controls,
		topicOptions,
		tagOptions,
		watch,
		getArray,
		entity_options,
		questionPreview,
		setQuestionPreview,
		onClickPublish,
	};
}

export default useCreateQuestions;
