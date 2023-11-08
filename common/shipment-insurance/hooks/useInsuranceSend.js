import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, upperCase } from '@cogoport/utils';

import getFormattedDate from '../helper/getFormattedDate';

const getPayload = ({
	formData = {}, draftData = {}, selectedAddress = {}, performedBy = '',
	billingType,
}) => {
	const {
		packageDescription, coverageFrom, coverageTo, invoiceNo, invoiceDate,
		invoiceDoc = {}, panDoc = {}, gstDoc = {}, aadharDoc = {}, pan_number, aadharNumber, transitDate, ...rest
	} = formData || {};

	const {
		cargoDetails = {}, invoiceDetails = {}, pocDetails = {},
		userId = '', organizationId = '', source = '', policyId = '', sid = '', shipmentId = '',
	} = draftData || {};

	const { transitMode, originCountryId, destinationCountryId, policyCommodityId	} = cargoDetails || {};

	const formmattedTransitDate = getFormattedDate({ currentDate: transitDate });
	const formmattedInvoiceDate = getFormattedDate({ currentDate: invoiceDate });

	return {
		isPaid          : false,
		checkoutRequest : {
			sid,
			userId,
			policyId,
			shipmentId,
			source,
			organizationId,
			billingParty: {
				partyName      : selectedAddress?.name,
				billingAddress : selectedAddress?.address,
				billingPincode : selectedAddress?.pincode,
				billingState   : selectedAddress?.state,
				addressType    : upperCase(selectedAddress?.address_type),
				billingCity    : selectedAddress?.city,
				billingType    : upperCase(billingType),
				gstNumber      : selectedAddress?.tax_number,
				panNumber      : pan_number,
				policyForSelf  : true,
				addressId      : selectedAddress?.id,
				aadharNumber,
			},
			cargoDetails: {
				transitMode,
				originCountryId,
				destinationCountryId,
				packaging    : packageDescription,
				locationFrom : coverageFrom,
				locationTo   : coverageTo,
				policyCommodityId,
				transitDate  : formmattedTransitDate,
				...rest,
			},
			invoiceDetails: {
				...invoiceDetails,
				invoiceNo,
				invoiceDate: formmattedInvoiceDate,
			},
			pocDetails,
			verificationDoc: {
				invoiceDoc: {
					name : invoiceDoc?.fileName,
					url  : invoiceDoc?.finalUrl,
				},
				panDoc: {
					name : panDoc?.fileName,
					url  : panDoc?.finalUrl,
				},
				gstDoc: !isEmpty(gstDoc) ? {
					name : gstDoc?.fileName,
					url  : gstDoc?.finalUrl,
				} : null,
				aadharDoc: !isEmpty(aadharDoc) ? {
					name : aadharDoc?.fileName,
					url  : aadharDoc?.finalUrl,
				} : null,
			},
			performedBy,
		},
	};
};

const useInsuranceSend = ({ setConfirmSuccess, draftData = {}, billingType, formRef }) => {
	const { user } = useSelector((state) => state.profile);

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/send/checkout',
		authKey : 'post_saas_insurance_v2_send_checkout',
	}, { manual: true });

	const confirmSendInsurance = async ({ formData, selectedAddress }) => {
		const payload = getPayload({ formData, draftData, performedBy: user?.id, selectedAddress, billingType });
		try {
			const resp = await trigger({
				data: payload,
			});
			const { data } = resp || {};

			setConfirmSuccess({ isOpen: true, isSuccess: true, paymentLink: data?.paymentLink });
		} catch (err) {
			Toast.error(err.response?.data?.message);
		}
	};

	const submitHandler = (data) => {
		const selectedAddress = formRef.current.address();

		confirmSendInsurance({ formData: data, selectedAddress });
	};

	return {
		loading, submitHandler,
	};
};

export default useInsuranceSend;
