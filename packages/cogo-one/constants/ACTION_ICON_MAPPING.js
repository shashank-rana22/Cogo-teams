import {
	IcADocumentTemplates,
	IcALocation,
	IcAWhitePapers,
} from '@cogoport/icons-react';

const ACTION_ICON_MAPPING = [
	{
		name        : 'shipment_tracking',
		icon        : <IcALocation width={28} height={28} />,
		title       : 'Shipment Tracking',
		href        : 'saas/tracking-job',
		redirecting : { prm: 'shipments', crm: 'shipments' },
	},
	{
		name        : 'invoicing',
		icon        : <IcAWhitePapers width={28} height={28} />,
		title       : 'Invoicing',
		href        : 'invoice-approvals',
		redirecting : { prm: 'finance', crm: 'finance' },
	},
	{
		name        : 'quotation',
		icon        : <IcADocumentTemplates width={28} height={28} />,
		title       : 'Quotation',
		href        : 'quotation-approval',
		redirecting : { prm: 'quotations', crm: 'quotations' },
	},
	{
		name : 'cogopoints',
		icon : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogopoints.svg"
			alt="icon"
			width="28px"
			height="28px"
		/>,
		title       : 'Cogopoints',
		href        : 'marketing/cogo-points/cogopoint_creation',
		redirecting : { prm: 'cogopoints', crm: undefined },
	},
];

export default ACTION_ICON_MAPPING;
