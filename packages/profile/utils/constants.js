import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcMBusiness,
	IcMLocation,
	IcMEmail,
	IcMCall,
} from '@cogoport/icons-react';

export const getEmployeeData = (employee_detail) => ([
	{ Icon: <IcMBusiness width={14} height={14} />, value: employee_detail?.role_name },
	{ Icon: <IcMLocation width={14} height={14} />, value: employee_detail?.office_location },
	{ Icon: <IcMEmail width={14} height={14} />, value: employee_detail?.cogoport_email },
	{ Icon: <IcMCall width={14} height={14} />, value: employee_detail?.mobile_number },
]);

const DOCUMENT_MAPPING = {
	aadhaar_card : 'Aadhaar Card',
	pan_card     : 'Pan Card',
};

export const getTablesData = (signed_documents, other_documents) => ([
	{
		heading : 'Employee Letters',
		data    : signed_documents.map((document) => ({
			name      : document.name,
			updatedAt : (document?.updated_at === undefined) ? ' — ' : formatDate({
				date       : document.updated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				formatType : 'date',
			}),
			url: document.document_url,
		})),
	},
	{
		heading : 'Other Documents',
		data    : other_documents.map((document) => ({
			name      : DOCUMENT_MAPPING[document.document_type],
			updatedAt : (document?.updated_at === undefined) ? ' — ' : formatDate({
				date       : document.updated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				formatType : 'date',
			}),
			url: document.document_url,
		})),
	},
]);

export const SalaryData = [{
	slno               : 1,
	ctc_effective_from : '12/09/2022',
	ctc_effective_to   : '-',
	monthly_gross      : '79654',
	monthly_ctc        : '82999',
	action             : 'View',
}];
