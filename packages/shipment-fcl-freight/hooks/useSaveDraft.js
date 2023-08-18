import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const EXCHANGE_VALUE = 500000000;
const CONDITION_ON_STEP = 2;

const useSaveDraft = ({
	shipmentData = {},
	step,
	exchangeVal = null,
	refetch = () => {},
	successMessage = 'Saved Successfully',
}) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [{ loading }, trigger] = useRequestBf({
		url    : 'saas/insurance/draft',
		auth   : 'post_saas_insurance_draft',
		method : 'POST',
	}, { manual: true });

	const saveData = async ({ key, payload }) => {
		const { cargoAmount = 0 } = payload || {};
		if (step === CONDITION_ON_STEP && cargoAmount * exchangeVal > EXCHANGE_VALUE) {
			return Toast.error(
				'We do not provide insurance for cargo value more than INR 50cr',
			);
		}
		try {
			await trigger({
				data: {
					source         : 'SHIPMENT',
					organizationId : shipmentData?.importer_exporter_id,
					userId,
					...payload,
					sid            : shipmentData?.serial_id,
					performedBy    : userId,
				},
			});
			Toast.success(successMessage);
			refetch(key);
		} catch (err) {
			toastApiError(err);
		}

		return null;
	};

	return {
		loading,
		saveData,
	};
};

export default useSaveDraft;
