import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetRDWallet = ({ data : walletData }) => {
	const [{ data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_rd_wallet',
	}, { manual: true });

	const getRdWallet = useCallback(async () => {
		try {
			await trigger({
				params: {
					service_id   : walletData?.id,
					service_type : walletData?.service_type,
				},
			});
		} catch (err) {
			// console.log(err)
		}
	}, [trigger, walletData?.id, walletData?.service_type]);

	useEffect(() => { getRdWallet(); }, [getRdWallet]);

	return { data };
};

export default useGetRDWallet;
