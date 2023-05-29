import { useRequestAir } from '@cogoport/request';
import { useCallback } from 'react';

const useGetManifest = () => {
	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents/list-manifest',
			method  : 'get',
			authKey : 'get_air_coe_documents_list_manifest',
		},
		{ manual: true },
	);

	const getManifest = useCallback((shipmentId) => {
		(async () => {
			try {
				await trigger({
					params: {
						shipmentId,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger]);

	return {
		data,
		getManifest,
		loading,
	};
};
export default useGetManifest;
