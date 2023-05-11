import { useRequestAir } from '@cogoport/request';

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
					documentId   : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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

	return {
		data,
		hawbCopiesList,
	};
};
export default useGetHawbCopiesList;
