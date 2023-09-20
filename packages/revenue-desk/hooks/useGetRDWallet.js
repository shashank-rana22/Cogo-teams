import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetRDWallet = ({ singleServiceData }) => {
	const [{ data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_rd_wallet',
	}, { manual: true });

	const { id = '', service_type = '' } = singleServiceData || {};

	const getRdWallet = useCallback(async () => {
		try {
			await trigger({
				params: {
					service_id: id || undefined,
					service_type,
				},
			});
		} catch (err) {
			// console.log(err)
		}
	}, [trigger, id, service_type]);

	useEffect(() => { getRdWallet(); }, [getRdWallet]);

	return { data };
};

export default useGetRDWallet;
