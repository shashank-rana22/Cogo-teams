import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListShipment = (jobNumber:string | undefined) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : 'list_shipments',
			method : 'get',
		},
	);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {
						filters: {
							serial_id: jobNumber,
						},
					},
				});
			} catch (error) {
				console.log('error->', error);
			}
		};
		getData();
	}, [jobNumber, trigger]);

	return {
		data,
		loading,
	};
};

export default useListShipment;
