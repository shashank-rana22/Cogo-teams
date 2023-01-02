import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetContract = ({ showDetail }) => {
	const [data, setData] = useState();

	const [{ error, loading }, trigger] = useRequest({
		url    : '/list_contracts',
		method : 'GET',
	}, { manual: true });
	const getContract = async () => {
		try {
			const res = await trigger({
				params: {
					services_data_required : true,
					filters                : { id: showDetail },
				},
			});
			setData(res?.data?.list);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (showDetail) {
			getContract();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(data, 'values');

	return {
		data: data?.[0],
		loading,
		error,
		getContract,
	};
};

export default useGetContract;
