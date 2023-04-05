import { useRequestAir } from '@cogoport/request';
import { useCallback } from 'react';

const useGetHawbList = (shipmentId) => {
	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/pending-tasks/list',
			method  : 'get',
			authKey : 'get_air_coe_pending_tasks_list',
		},
		{ manual: true },
	);

	const getHawbList = useCallback(() => {
		(async () => {
			const payload = {
				assignedStakeholder : 'service_ops2_docs',
				documentState       : ['document_accepted', 'document_uploaded', 'document_amendment_requested'],
				documentType        : ['draft_house_airway_bill'],
				task                : ['approve_draft_house_airway_bill', 'amend_draft_house_airway_bill'],
				isDocDataRequired   : true,
				shipmentId,
				pageSize            : 100,
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

	return {
		data,
		loading,
		getHawbList,
	};
};
export default useGetHawbList;
