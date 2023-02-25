import useGetCustomAsyncOptions from '../hooks/useCustomAsyncOptions';

const useGetTagControls = () => {
	const tagOptions = useGetCustomAsyncOptions({
		endpoint    : 'list_tags',
		initialCall : false,
		valueKey    : 'tag',
		labelKey    : 'tag',
		filterKey   : 'Q',
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
		rules          : [{ required: false }],
	};
};

export default useGetTagControls;
