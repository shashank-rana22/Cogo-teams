import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import createQuestionControls from '../utils/createQuestionControls';

import useGetTopicTagList from './hooks/useGetTopicTagList';
import useListCogoEntity from './hooks/useListCogoEntities';

function useCreateQuestions() {
	const router = useRouter();

	const [editorValue, setEditorValue] = useState('');
	const [questionPreview, setQuestionPreview] = useState('create');

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

	const onSubmit = () => {
		router.push(
			'/learning/faq/create/question?mode=preview',
			'/learning/faq/create/configuration?mode=preview',
		);
		setQuestionPreview('preview');
	};

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
	};
}

export default useCreateQuestions;
