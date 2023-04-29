import useGetCustomAsyncOptions from '../hooks/useCustomAsyncOptions';

const useGetTagControls = () => {
	const tagOptions = useGetCustomAsyncOptions({
		endpoint    : 'get_iris_list_tags',
		initialCall : false,
		valueKey    : 'tag',
		labelKey    : 'tag',
		filterKey   : 'Q',
	});

	return {
		...tagOptions,
		label       : 'Tag Name',
		name        : 'tags',
		placeholder : 'Select Tags...',
		type        : 'select',
		isClearable : true,
		span        : 5.5,
		rules       : [{ required: false }],
	};
};

export default useGetTagControls;
