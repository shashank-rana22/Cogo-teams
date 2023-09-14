import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const getCreateInstructionParams = ({
	formValues,
	sop_detail,
	trade_type,
	billingAddressData,
	orgPocData,
	watchModeOfExecution,
}) => {
	const orgPocForPickup = (orgPocData || []).find(
		(item) => item?.name === formValues?.name,
	)?.id;

	const { organization_pocs = {}, id : billingAddressId = '' } = (billingAddressData || []).find(
		(item) => item?.address === formValues?.address,
	) || {};

	const orgPocForCourier = organization_pocs?.[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const orgPoc = watchModeOfExecution === 'pickup' ? orgPocForPickup : orgPocForCourier;

	const userDetailsArr = [
		{
			is_primary                      : !isEmpty(formValues?.is_primary) ? formValues?.is_primary : false,
			poc_id                          : orgPoc,
			pincode                         : formValues?.pincode,
			organization_billing_address_id : billingAddressId,
		},
	];

	const crmPayload = isEmpty(sop_detail) ? {
		shipment_mode                               : 'ocean',
		trade_type,
		organization_document_handling_user_details : !isEmpty(orgPoc) ? userDetailsArr : undefined,
	} : undefined;

	const PARAMS = { instruction: 'document_handling_preference', sop_instructions: [formValues], ...crmPayload };

	return PARAMS;
};
export default getCreateInstructionParams;
