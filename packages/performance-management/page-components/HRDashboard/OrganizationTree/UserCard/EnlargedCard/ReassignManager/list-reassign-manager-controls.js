import useGetCustomAsyncOptions from '../../../../../../hooks/useCustomAsyncOptions';

const useListReassignControls = () => {
	const asyncManagerOptions = useGetCustomAsyncOptions({
		endpoint    : 'get_iris_list_managers',
		initialCall : false,
		valueKey    : 'manager_id',
		labelKey    : 'name',
		filterKey   : 'Q',
	});

	return { ...asyncManagerOptions, name: 'manager_id', placeholder: 'Select Manager' };
};

export default useListReassignControls;
