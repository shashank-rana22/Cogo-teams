import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import { useRef } from 'react';

const getPayload = ({ data = {}, pocDetails, performedBy, policySearchId }) => {
	const { firstName, lastName, email, phoneNo } = pocDetails || {};
	const { userId = '', organizationId = '', metadata = {}, rateRequest = {}	} = data || {};

	const {
		invoiceValue
		= '', invoiceCurrency = '', hsCode = '',
		destinationCountryId = '', originCountryId = '',
	} = rateRequest || {};

	const { origin = {}, destination = {}, transitMode = '' } = metadata || {};

	return {
		userId,
		organizationId,
		source     : 'ADMIN',
		pocDetails : {
			insuredFirstName : firstName,
			insuredLastName  : lastName,
			email,
			phoneNo          : phoneNo.country_code + phoneNo.number,
		},
		billingParty: {
			billingType: 'CORPORATE',
		},
		invoiceDetails: {
			invoiceCurrency,
			invoiceValue,
		},
		cargoDetails: {
			originCountryId,
			destinationCountryId,
			hsCode,
			transitMode       : upperCase(transitMode),
			destinationPortId : origin?.id,
			originPortId      : destination?.id,
		},
		performedBy,
		policySearchId,
		metadata,
	};
};

function useDraft({ data = {} }) {
	const { query, push } = useRouter();
	const { policySearchId, draftId = '' } = query;

	const { user } = useSelector((state) => state.profile);

	const personalDetailRef = useRef({});

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/draft',
		authKey : 'post_saas_insurance_v2_draft',
	}, { manual: true });

	const [{ loading: getLoading, data: draftData }] = useRequestBf({
		method  : 'get',
		url     : '/saas/insurance/v2/details',
		authKey : 'get_saas_insurance_v2_details',
		params  : {
			policyId: draftId,
		},
	}, { manual: !draftId });

	const saveDraft = async ({ pocDetails }) => {
		const payload = getPayload({ data, pocDetails, performedBy: user?.id, policySearchId });
		try {
			const resp = await trigger({
				data: payload,
			});
			const { id } = resp?.data || {};
			push(`/cargo-insurance/${policySearchId}/${id}`);
		} catch (error) {
			Toast.error(error.response?.data?.message);
		}
	};

	const submitHandler = async () => {
		const resp = await personalDetailRef.current.getPersonalDetails();

		const { phoneNo } = resp || {};

		if (!phoneNo?.country_code) {
			Toast.error('Please Select Mobile Code');
		}
		saveDraft({ pocDetails: resp });
	};

	return {
		loading, submitHandler, personalDetailRef, getLoading, draftData,
	};
}

export default useDraft;
