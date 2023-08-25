import { useRequest } from '@cogoport/request';

const useListFclSearchesView = ({ id }) => {
	const [{ data, loading }] = useRequest(
		{
			url    : '/list_rolling_fcl_freight_searches',
			method : 'get',
			params : {
				service_data_required    : true,
				allocation_data_required : true,
				filters                  : { id },
			},
		},
		{ manual: false },
	);

	return {
		data,
		loading,
	};
};

export default useListFclSearchesView;
