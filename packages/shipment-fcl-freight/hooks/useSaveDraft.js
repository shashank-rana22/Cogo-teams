import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

const EXCHANGE_VALUE = 500000000;
const CONDITION_ON_STEP = 2;
const LAST_STEP = 3;
const INCREMENT_FACTOR = 1;

const useSaveDraft = ({
	shipmentData = {},
	policyId = '',
	setStep = () => {},
	step,
	premiumData = {},
	insuranceDetails = {},
	policyForSelf = false,
	billingData = {},
	exchangeVal = null,
	addressId = '',
}) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};
	const { taxAmount, ...restPremiumData } = premiumData;

	const [{ loading }, trigger] = useRequestBf({
		url    : 'saas/insurance/draft',
		auth   : 'post_insurance_draft',
		method : 'POST',
	}, { manual: true });

	let payload = {};
	Object.keys(insuranceDetails).forEach((key) => {
		const {
			aadharNumber,
			organizationAddressId,
			organizationBillingAddressId,
			panDoc,
			gstDoc,
			invoiceDoc,
			...rest
		} = policyForSelf
			? { ...insuranceDetails, ...billingData }
			: insuranceDetails;

		if (insuranceDetails[key]) {
			payload = {
				...addressId,
				...rest,
				...restPremiumData,
				verificationDoc: {
					gstDoc: !isEmpty(gstDoc?.finalUrl) ? {
						name    : gstDoc?.fileName,
						url     : gstDoc?.finalUrl,
						success : true,

					} : undefined,
					panDoc: !isEmpty(panDoc?.finalUrl) ? {
						name    : panDoc?.fileName,
						url     : panDoc?.finalUrl,
						success : true,

					} : undefined,
					invoiceDoc: !isEmpty(invoiceDoc?.finalUrl) ? {
						name    : invoiceDoc?.fileName,
						url     : invoiceDoc?.finalUrl,
						success : true,

					} : undefined,
				},
				policyForSelf,
				billingType : 'CORPORATE',
				policyId,
				gstAmount   : taxAmount,
			};
		}
	});

	const { cargoAmount = 0 } = payload || {};

	const saveData = useCallback(async (key) => {
		if (step === CONDITION_ON_STEP && cargoAmount * exchangeVal > EXCHANGE_VALUE) {
			return Toast.error(
				'We do not provide insurance for cargo value more than INR 50cr',
			);
		}
		try {
			const res = await trigger({
				data: {
					source         : 'SHIPMENT',
					organizationId : shipmentData?.importer_exporter_id,
					userId,
					...payload,
					sid            : shipmentData?.serial_id,
				},
			});
			if (!res.hasError) {
				Toast.success('Saved Successfully');

				if (key === 'next_step') {
					setStep(() => (step !== LAST_STEP ? step + INCREMENT_FACTOR : step));
				}
			}
		} catch (err) {
			toastApiError(err);
		}

		return null;
	}, [exchangeVal, setStep,
		shipmentData?.importer_exporter_id, shipmentData?.serial_id, step, trigger, userId]);

	return {
		loading,
		saveData,
	};
};

export default useSaveDraft;
