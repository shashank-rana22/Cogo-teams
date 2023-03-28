import { useRequestAir } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetHawbList = (shipmentId) => {
	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents/list',
			method  : 'get',
			authKey : 'get_air_coe_documents_list',
		},
		{ manual: true },
	);

	const getHawbList = useCallback(() => {
		(async () => {
			const payload = {
				documentState: ['document_accepted', 'document_uploaded', 'document_amendment_requested'],
				shipmentId,
			};
			try {
				await trigger({
					params:	payload,
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [shipmentId, trigger]);

	useEffect(() => {
		getHawbList();
	}, [getHawbList]);

	return {
		data,
		loading,
		getHawbList,
	};
};
export default useGetHawbList;
