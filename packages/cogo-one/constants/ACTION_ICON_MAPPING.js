import {
	IcCCogoCoin,
	IcADocumentTemplates,
	IcACrossBorder,
	IcALocation,
	IcAFaqs,
	IcADiscoverRates,
	IcAWhitePapers,
} from '@cogoport/icons-react';

const ACTION_ICON_MAPPING = [
	{
		name  : 'spot_search',
		icon  : <IcAFaqs width={28} height={28} />,
		title : 'Spot Search',
	},
	{
		name  : 'shipment_tracking',
		icon  : <IcALocation width={28} height={28} />,
		title : 'Shipment Tracking',
	},
	{
		name  : 'schedule_air_ocean',
		icon  : <IcACrossBorder width={28} height={28} />,
		title : 'Schedule Air/Ocean',
	},
	{
		name  : 'outstanding_invoices',
		icon  : <IcADiscoverRates width={28} height={28} />,
		title : 'Outstanding Invoices',
	},
	{
		name  : 'invoicing',
		icon  : <IcAWhitePapers width={28} height={28} />,
		title : 'Invoicing',
	},
	{
		name  : 'quotation',
		icon  : <IcADocumentTemplates width={28} height={28} />,
		title : 'Quotation',
	},
	{
		name  : 'cogopoints',
		icon  : <IcCCogoCoin width={28} height={28} />,
		title : 'Cogopoints',
	},
];
export default ACTION_ICON_MAPPING;
