import { useGetAsyncOptions } from '@cogoport/forms';

export const useGetCreateQuestionsControls = () => {
	const tagOptions = useGetAsyncOptions({
		endpoint    : 'list_question_tags',
		initialCall : false,
		params      : {
			filters: {
			},
		},
		valueKey : 'user_id',
		labelKey : 'name',
	});

	return [
		{
			name        : 'question',
			label       : 'Question',
			placeholder : 'Write Question Here...',
			type        : 'text_area',
			span        : 10,
			style       : { marginLeft: '1px', marginRight: '1px' },
			rules       : { required: 'Please write the question...' },
		},
		{
			name        : 'description',
			label       : 'Description',
			placeholder : 'Write Description Here...',
			type        : 'text_area',
			style       : { marginLeft: '1px', marginRight: '1px' },
			span        : 10,
			rules       : { required: 'Please provide the remark...' },
		},
		{
			...tagOptions,
			label          : 'Tag Name',
			name           : 'tags',
			placeholder    : 'Select Tags...',
			type           : 'creatable_multiselect',
			defaultOptions : true,
			isClearable    : true,
			span           : 5,
			validations    : [{ type: 'required', message: 'Required' }],
		},
	];
};
