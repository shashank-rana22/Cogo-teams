import { useRequestAir } from '@cogoport/request';
import { useEffect } from 'react';

const useGetMultipleCopiesList = (taskItem) => {
	const [{ data = {} }, trigger] = useRequestAir(
		{
			url     : '/air-coe/document-copy/list',
			method  : 'get',
			authKey : 'get_air_coe_document_copy_list',
		},
		{ manual: true },
	);

	const multipleCopiesList = async () => {
		try {
			await trigger({
				params: {
					documentId   : taskItem?.documentId,
					documentType : taskItem?.documentType === 'draft_airway_bill'
						? 'draft_airway_bill' : 'draft_house_airway_bill',
					status    : ['created', 'updated'],
					pageIndex : 0,
					pageSize  : 0,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		multipleCopiesList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data: data?.list,
		multipleCopiesList,
	};
};
export default useGetMultipleCopiesList;
