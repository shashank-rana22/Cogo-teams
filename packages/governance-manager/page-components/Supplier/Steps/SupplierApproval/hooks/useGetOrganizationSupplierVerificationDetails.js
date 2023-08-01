import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const ZERO = 0;
function useGetOrganizationSupplierVerificationDetails({ organization_id, organization_service_id, setVerify }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_organization_supplier_verification_details',
	}, { manual: true });

	const getOrganizationSupplierVerificationDetails = async () => {
		try {
			const res = await trigger({
				params: {
					organization_id,
					organization_service_id,
				},
			});
			setVerify(
				{
					need_analysis_report   : res?.data?.need_analysis_details?.[ZERO]?.manager_approval_status,
					market_feedback_report : res?.data?.market_feedback_details?.verification_status,
					evaluation_paramenter_report:
                     res?.data?.organization_evaluation_details?.[ZERO]?.manager_approval_status,
					financial_due_diligence_report:
                    res?.data?.organization_due_diligence_status?.manager_approval_status,
				},
			);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (organization_id && organization_service_id) { getOrganizationSupplierVerificationDetails(); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organization_id, organization_service_id]);
	return {
		data,
		loading,
		getOrganizationSupplierVerificationDetails,
	};
}
export default useGetOrganizationSupplierVerificationDetails;
