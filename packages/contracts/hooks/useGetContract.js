import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetContract = ({ id }) => {
	const [data, setData] = useState();

	const [{ error, loading }, trigger] = useRequest({
		url    : '/list_contracts',
		method : 'GET',
	}, { manual: true });
	const getContract = async () => {
		try {
			const res = await trigger({
				params: {
					services_data_required             : true,
					contract_utilisation_data_required : true,
					filters                            : {
						id,
					},
				},
			});
			setData(res?.data);
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		if (id) {
			getContract();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data: data?.list[0],
		loading,
		error,
		getContract,
	};
};

export default useGetContract;
