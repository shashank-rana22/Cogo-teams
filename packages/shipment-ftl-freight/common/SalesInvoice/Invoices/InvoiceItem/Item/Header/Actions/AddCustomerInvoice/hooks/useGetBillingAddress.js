import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import {
	BUSINESS_TO_SERVICE_DESCRIPTION,
	DEFAULT_BANK_DETAILS,
	PAN_TO_CIN_MAPPING,
	PAN_TO_SERVICE_DESCRIPTION_MAPPING,
	PAN_TO_BANK_DETAILS_MAPPING,
	getFortigoDetails,
} from '../utils/serviceDescriptionMappings';

const SINGLE_VALUE = 1;

const useGetBillingAddress = ({
	invoice = {},
	entityList = [],
	importerExporterId = '',
	customData = {},
}) => {
	const geo = getGeoConstants();
	const initBillingAddress = { ...(invoice?.billing_address || {}) };

	const {
		CUSTOMER_TO_SERVICE_DESCRIPTION = {},
		CUSTOMER_TO_BANK_DETAILS = {},
		CUSTOMER_TO_CIN = {},
	} = getFortigoDetails();

	const supportedEntities = Object.keys(ENTITY_FEATURE_MAPPING).filter(
		(item) => item?.feature_supported?.includes('ftl_customer_invoice'),
	);

	const {
		cogoport_ftl_collections = '',
		cogoport_support = '',
	} = GLOBAL_CONSTANTS.emails || {};

	const { fortigo_support = '', fortigo_collections = '' } = GLOBAL_CONSTANTS?.others?.fortigo_details?.emails || {};

	const { fortigo = '', cogoport = '' } = GLOBAL_CONSTANTS.websites || {};

	if (geo.uuid.fortigo_network_ids?.includes(importerExporterId)) {
		return {
			billing_address: {
				...initBillingAddress,
				cin                     : CUSTOMER_TO_CIN[importerExporterId],
				email                   : fortigo_support,
				website                 : fortigo,
				service_description     : CUSTOMER_TO_SERVICE_DESCRIPTION[importerExporterId],
				payment_email           : fortigo_collections,
				branch_city             : GLOBAL_CONSTANTS?.others?.fortigo_details?.fortigo_branch_city,
				is_required_for_fortigo : true,
				bank_details            : CUSTOMER_TO_BANK_DETAILS[importerExporterId],
			},
		};
	}

	if (
		Object.values(GLOBAL_CONSTANTS.others?.fortigo_details?.fortigo_company_pan_mappings).includes(
			initBillingAddress?.registration_number,
		)
	) {
		return {
			billing_address: {
				...initBillingAddress,
				cin: PAN_TO_CIN_MAPPING[initBillingAddress?.registration_number],
				service_description:
					PAN_TO_SERVICE_DESCRIPTION_MAPPING[initBillingAddress?.registration_number],
				email                   : fortigo_support,
				website                 : fortigo,
				payment_email           : fortigo_collections,
				branch_city             : GLOBAL_CONSTANTS?.others?.fortigo_details?.fortigo_branch_city,
				is_required_for_fortigo : true,
				bank_details:
					PAN_TO_BANK_DETAILS_MAPPING[initBillingAddress?.registration_number],
			},
		};
	}

	if (
		[customData?.cogo_entity_id,
			customData?.cogo_entity_address_id,
			customData?.business_mode].every((ele) => !isEmpty(ele))
	) {
		const entity =	entityList?.find((item) => item?.id === customData?.cogo_entity_id) || {};
		const entityAddress = entity?.addresses?.find(
			(item) => item?.id === customData?.cogo_entity_address_id,
		) || {};

		return {
			billing_address: {
				...initBillingAddress,
				cin                 : entity?.cin,
				business_name       : entity?.business_name,
				registration_number : entity?.registration_number,
				tax_number          : entityAddress?.gst_number,
				pin_code            : entityAddress?.pin_code || '',
				address             : entityAddress?.address,
				email               : cogoport_support,
				website             : cogoport,
				service_description:
					BUSINESS_TO_SERVICE_DESCRIPTION[customData?.business_mode],
				payment_email           : cogoport_ftl_collections,
				branch_city             : entityAddress?.city?.name,
				is_required_for_fortigo : false,
				bank_details            : DEFAULT_BANK_DETAILS,
			},
		};
	}

	if (supportedEntities?.length === SINGLE_VALUE) {
		const entityKey = supportedEntities[GLOBAL_CONSTANTS.zeroth_index] || '';
		const cogo_entity_id = GLOBAL_CONSTANTS.cogoport_entities?.[entityKey]?.id || '';
		const entity = entityList?.find((item) => item?.id === cogo_entity_id) || {};
		let entityAddress =	 {};
		let taxMechanism = '';

		if (initBillingAddress?.tax_mechanism !== 'reverse_charge_mechanism') {
			entityAddress =	entity?.addresses?.find(
				(item) => item?.gst_number === GLOBAL_CONSTANTS.others.cogo_mumbai_gst,
			) || {};
			taxMechanism = 'fcm';
		} else {
			entityAddress =	entity?.addresses?.find(
				(item) => item?.gst_number !== GLOBAL_CONSTANTS.others.cogo_mumbai_gst,
			) || {};
			taxMechanism = 'rcm';
		}

		return {
			billing_address: {
				...initBillingAddress,
				cin                     : entity?.cin,
				business_name           : entity?.business_name,
				registration_number     : entity?.registration_number,
				tax_number              : entityAddress?.gst_number,
				pin_code                : entityAddress?.pin_code || '',
				address                 : entityAddress?.address,
				email                   : cogoport_support,
				website                 : cogoport,
				service_description     : BUSINESS_TO_SERVICE_DESCRIPTION[taxMechanism],
				payment_email           : cogoport_ftl_collections,
				branch_city             : entityAddress?.city?.name,
				is_required_for_fortigo : false,
				bank_details            : DEFAULT_BANK_DETAILS,
			},
		};
	}

	return {
		billing_address: initBillingAddress,
	};
};

export default useGetBillingAddress;
