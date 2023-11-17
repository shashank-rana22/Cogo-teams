import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcMBusiness,
	IcMLocation,
	IcMEmail,
	IcMCall,
	IcMCloudUpload,
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
	resume       : 'Resume',
	passport     : 'Passport',
};

export const getTablesData = (
	signed_documents,
	other_documents,
	showAddUploadModal,
	setShowAddUploadModal,
	flagUpload,
) => ([
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
		heading:
	<div style={{ display: 'flex', justifyContent: 'space-between' }}>
		<div>Other Documents</div>
		<div>
			<Button
				size="md"
				themeType="secondary"
				disabled={!flagUpload}
				onClick={() => setShowAddUploadModal(true)}
			>
				<IcMCloudUpload />
				Upload
			</Button>
		</div>
	</div>,
		data: other_documents.map((document) => {
			console.log(document?.document_type, 'document_type');
			return ({
				name      : DOCUMENT_MAPPING[document.document_type],
				key       : document.document_type,
				updatedAt : (document?.updated_at === undefined) ? ' — ' : formatDate({
					date       : document.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				}),
				url    : document.document_url,
				number : document.document_number,
			});
		}),
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

export const STEPPER_ITEMS = [
	{ title: 'HR Meet', key: 'hr_meet' },
	{ title: 'RM Clearance', key: 'manager_clearance' },
	{ title: 'Tech Clearance', key: 'tech_clearance' },
	{ title: 'HOTO Clearance', key: 'hoto_clearance' },
	{ title: 'Finance Clearance', key: 'finance_clearance' },
	{ title: 'Admin Clearance', key: 'admin_clearance' },
	{ title: 'Exit Interview', key: 'exit_interview' },
	{ title: 'Exit Completed', key: 'exit_completed' },
];

export const gender_options = [
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' },
	{ label: 'Others', value: 'others' },
];

export const marry_options = [
	{ label: 'Married', value: 'married' },
	{ label: 'Single', value: 'single' },
];
