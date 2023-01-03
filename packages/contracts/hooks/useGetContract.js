import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetContract = ({ id }) => {
	const [data, setData] = useState();

	const [{ error, loading }, trigger] = useRequest({
		url    : '/get_contract',
		method : 'GET',
	}, { manual: true });
	const getContract = async () => {
		try {
			const res = await trigger({
				params: {
					services_data_required: true,
					id,
				},
			});
			setData(res?.data?.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (id) {
			getContract();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data,
		loading,
		error,
		getContract,
	};
};

export default useGetContract;
