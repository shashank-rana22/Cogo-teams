import { useRequestAir } from '@cogoport/request';
import { useState } from 'react';

const useGetHawb = () => {
	const [hawbSuccess, setHawbSuccess] = useState(false);

	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents',
			method  : 'get',
			authKey : 'get_air_coe_documents',
		},
		{ manual: true },
	);

	const getHawb = async (id) => {
		try {
			await trigger({
				params: {
					id,
				},
			});
			setHawbSuccess(true);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		hawbData: data,
		getHawb,
		hawbSuccess,
		setHawbSuccess,
		loading,
	};
};
export default useGetHawb;
