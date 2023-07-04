import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useUpdateShipmentService from './useUpdateShipmentService';

const useInsuranceCheckoutAndGenerate = ({
	policyId = '',
	uploadProof = null,
	refetch = () => {},
	shipmentData = {},
	successMessage = 'Task Completed Successfully!',
}) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const { apiTrigger: getUpdateShipmentService, apiLoading } = useUpdateShipmentService({ refetch });

	const [{ loading }, trigger] = useRequestBf({
		auth   : 'post_saas_insurance_checkout_and_generate',
		url    : 'saas/insurance/checkout-and-generate',
		method : 'POST',
	}, { manual: true });

	const generateInsurance = async ({ payload, payloadForUpdateShipment }) => {
		try {
			await trigger({
				data: {
					...payload,
					source                  : 'SHIPMENT',
					organizationId          : shipmentData?.importer_exporter_id,
					userId,
					sid                     : shipmentData?.serial_id,
					shipmentId              : shipmentData?.id,
					policyId,
					performedBy             : userId,
					customerConfirmationDoc : uploadProof?.[GLOBAL_CONSTANTS.zeroth_index]?.name,
				},
			});
			await getUpdateShipmentService({
				data: payloadForUpdateShipment,
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			Toast.error(err?.data?.message);
		}
	};

	return {
		loading: loading || apiLoading,
		generateInsurance,
	};
};
export default useInsuranceCheckoutAndGenerate;
