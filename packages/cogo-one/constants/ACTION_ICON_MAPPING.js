import {
	IcCCogoCoin,
	IcADocumentTemplates,
	IcACrossBorder,
	IcALocation,
	IcADiscoverRates,
	IcAWhitePapers,
} from '@cogoport/icons-react';

const ACTION_ICON_MAPPING = [
	{
		name  : 'shipment_tracking',
		icon  : <IcALocation width={28} height={28} />,
		title : 'Shipment Tracking',
		href  : 'saas/tracking-job',
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
		name  : 'quotation',
		icon  : <IcADocumentTemplates width={28} height={28} />,
		title : 'Quotation',
		href  : 'quotation-approval',
	},
	{
		name  : 'cogopoints',
		icon  : <IcCCogoCoin width={28} height={28} />,
		title : 'Cogopoints',
		href  : 'marketing/cogo-points/cogopoint_creation',
	},
];

export default ACTION_ICON_MAPPING;
