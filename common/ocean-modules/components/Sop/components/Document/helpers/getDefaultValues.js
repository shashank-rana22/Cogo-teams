import { isEmpty } from '@cogoport/utils';

const DOCUMENT_FORM_FIELDS = ['bl_category', 'bl_preference', 'preferred_mode_of_document_execution', 'name',
	'country_code', 'contact_no', 'address'];

export const getDefaultValues = ({ sop_detail }) => {
	const DEFAULT_VALUES = {};

	if (!isEmpty(sop_detail)) {
		DOCUMENT_FORM_FIELDS.forEach((k) => { if (sop_detail[k]) DEFAULT_VALUES[k] = sop_detail[k]; });
	}

	return {
		DEFAULT_VALUES,
	};
};
