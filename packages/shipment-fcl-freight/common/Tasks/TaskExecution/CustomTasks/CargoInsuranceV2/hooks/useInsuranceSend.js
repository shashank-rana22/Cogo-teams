import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, upperCase } from '@cogoport/utils';

const getPayload = ({
	formData = {}, draftData = {}, selectedAddress = {}, performedBy = '',
	billingType, query = {},
}) => {
	const { draftId, policySearchId } = query || {};
	const {
		packageDescription, coverageFrom, coverageTo, invoiceNo, invoiceDate,
		invoiceDoc = {}, panDoc = {}, gstDoc = {}, aadharDoc = {}, pan_number, aadharNumber, ...rest
	} = formData || {};

	const {
		cargoDetails = {}, invoiceDetails = {}, pocDetails = {},
		userId = '', organizationId = '', source = '',
	} = draftData || {};

	const { transitMode, originCountryId, destinationCountryId, hsCode	} = cargoDetails || {};

	return {
		isPaid          : false,
		checkoutRequest : {
			userId,
			policySearchId,
			organizationId,
			policyId     : draftId,
			source,
			billingParty : {
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
				hsCode,
				...rest,
			},
			invoiceDetails: {
				...invoiceDetails,
				invoiceNo,
				invoiceDate,
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
	const { query } = useRouter();

	const { user } = useSelector((state) => state.profile);

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/send/checkout',
		authKey : 'post_saas_insurance_v2_send_checkout',
	}, { manual: true });

	const confirmSendInsurance = async ({ formData, selectedAddress }) => {
		const payload = getPayload({ formData, draftData, performedBy: user?.id, selectedAddress, billingType, query });
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

		if (isEmpty(selectedAddress)) {
			Toast.error(t('cargoInsurance:address_err'));
			return;
		}
		confirmSendInsurance({ formData: data, selectedAddress });
	};

	return {
		loading, submitHandler, formRef,
	};
};

export default useInsuranceSend;
