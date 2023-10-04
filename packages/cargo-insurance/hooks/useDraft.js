import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import { useRef } from 'react';

const getPayload = ({ formValues, pocDetails, performedBy }) => {
	const { firstName, lastName, email, phoneNo } = pocDetails || {};
	const {
		orgDetails, cargoValue, currency,
		destinationCountryId, originCountryId, origin_point, destination_point, hsCode, type,
	} = formValues || {};

	const { user_id, organization_id } = orgDetails || {};

	return {
		userId         : user_id,
		organizationId : organization_id,
		source         : 'ADMIN',
		pocDetails     : {
			insuredFirstName : firstName,
			insuredLastName  : lastName,
			email,
			phoneNo          : phoneNo.country_code + phoneNo.number,
		},
		billingParty: {
			billingType: 'CORPORATE',
		},
		invoiceDetails: {
			invoiceCurrency : currency,
			invoiceValue    : cargoValue,
		},
		cargoDetails: {
			originCountryId,
			destinationCountryId,
			hsCode,
			transitMode       : upperCase(type),
			destinationPortId : origin_point,
			originPortId      : destination_point,
		},
		performedBy,
	};
};

function useDraft({ formValues = {} }) {
	const { user } = useSelector((state) => state.profile);

	const personalDetailRef = useRef({});

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/draft',
		authKey : 'post_saas_insurance_v2_draft',
	}, { manual: true });

	const saveDraft = ({ pocDetails }) => {
		const payload = getPayload({ formValues, pocDetails, performedBy: user?.id });
		try {
			trigger({
				data: payload,
			});
		} catch (error) {
			Toast.error(error.response?.data?.message);
		}
	};

	const submitHandler = async () => {
		const resp = await personalDetailRef.current.getPersonalDetails();
		const { phoneNo } = resp || {};

		if (!phoneNo?.country_code) {
			Toast.error('Please Select Mobile Code');
			return;
		}
		saveDraft({ pocDetails: resp });
	};

	return {
		loading, submitHandler, personalDetailRef,
	};
}

export default useDraft;
