import {
	IcADocumentTemplates,
	IcACrossBorder,
	IcALocation,
	IcADiscoverRates,
	IcAWhitePapers,
} from '@cogoport/icons-react';

const ACTION_ICON_MAPPING = [
	{
		name        : 'shipment_tracking',
		icon        : <IcALocation width={28} height={28} />,
		title       : 'Shipment Tracking',
		href        : 'saas/tracking-job',
		redirecting : 'shipments',
	},
	{
		name  : 'schedule_air_ocean',
		icon  : <IcACrossBorder width={28} height={28} />,
		title : 'Schedule Air/Ocean',
		href  : 'saas/air-schedules',

	},
	{
		name  : 'outstanding_invoices',
		icon  : <IcADiscoverRates width={28} height={28} />,
		title : 'Outstanding Invoices',
		href  : 'outstanding',

	},
	{
		name  : 'invoicing',
		icon  : <IcAWhitePapers width={28} height={28} />,
		title : 'Invoicing',
		href  : 'invoice-approvals',
	},
	{
		name        : 'quotation',
		icon        : <IcADocumentTemplates width={28} height={28} />,
		title       : 'Quotation',
		href        : 'quotation-approval',
		redirecting : 'quotations',
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
		redirecting : 'cogopoints',
	},
];

export default ACTION_ICON_MAPPING;
