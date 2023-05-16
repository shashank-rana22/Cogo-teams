import { useRequestAir } from '@cogoport/request';
import { useEffect } from 'react';

const useGetHawbCopiesList = () => {
	const [{ data = {} }, trigger] = useRequestAir(
		{
			url    : '/air-coe/document-copy/list',
			method : 'get',
			// authKey : 'get_air_coe_documents_list',
		},
		{ manual: true },
	);

	const hawbCopiesList = async () => {
		try {
			await trigger({
				params: {
					documentId   : '35cd7dcb-5ddb-4382-807f-c312aec6909c',
					documentType : 'draft_airway_bill',
					status       : 'active',
					pageIndex    : 0,
					pageSize     : 0,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		hawbCopiesList();
	}, []);

	return {
		data: data?.list,
		hawbCopiesList,
	};
};
export default useGetHawbCopiesList;
