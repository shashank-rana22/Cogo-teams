import useGetCustomAsyncOptions from '../hooks/useCustomAsyncOptions';

export const useGetCreateQuestionsControls = () => {
	const tagOptions = useGetCustomAsyncOptions({
		endpoint    : 'list-tags',
		initialCall : false,
		params      : {
			filters: {
			},
		},
		valueKey  : 'tag',
		labelKey  : 'tag',
		filterKey : 'Q',
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
			rules       : { required: false },
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
