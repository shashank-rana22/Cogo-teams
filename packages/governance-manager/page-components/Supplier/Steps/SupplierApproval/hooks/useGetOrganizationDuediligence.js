import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationDueDiligence({ organization_id, t }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_organization_due_diligence_report',
	}, { manual: true });

	const getOrganizationDueDiligence = async () => {
		try {
			await trigger({
				params: {
					organization_id,
				},
			});
		} catch (err) {
			Toast.error(t('supplier_page_supplier_approval_modal_due_diligence_not_present_label'));
			console.log(err);
		}
	};
	useEffect(() => {
		getOrganizationDueDiligence();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		data,
		loading,
		getOrganizationDueDiligence,
	};
}

export default useGetOrganizationDueDiligence;
