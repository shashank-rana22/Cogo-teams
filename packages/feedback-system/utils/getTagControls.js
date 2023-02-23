import useGetCustomAsyncOptions from '../hooks/useCustomAsyncOptions';

const useGetTagControls = () => {
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

	return {
		...tagOptions,
		label          : 'Tag Name',
		name           : 'tags',
		placeholder    : 'Select Tags...',
		type           : 'select',
		defaultOptions : true,
		isClearable    : true,
		span           : 5.5,
		validations    : [{ type: 'required', message: 'Required' }],
	};
};

export default useGetTagControls;
