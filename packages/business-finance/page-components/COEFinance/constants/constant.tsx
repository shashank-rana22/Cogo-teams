import React from 'react';
import {
	IcMFrupee,
	IcMFdollar,
	IcMFeuro,
	IcMFpound,
	IcMFsingaporeDollar,
	IcCCountryIndia,
	IcCCountrySingapore,
	IcCCountryNetherland,
} from '@cogoport/icons-react';

const CURRENCY_DATA = 

		[
			{ id: '1', icon: <IcMFrupee width={25} height={25} />, text: 'INR' },
			{ id: '2', icon: <IcMFdollar width={25} height={25} />, text: 'USD' },
			{
				id: '3',
				icon: <IcMFsingaporeDollar width={25} height={25} />,
				text: 'SGD',
			},
			{ id: '4', icon: <IcMFpound width={25} height={25} />, text: 'GBP' },
			{ id: '5', icon: <IcMFeuro width={25} height={25} />, text: 'EUR' },
		];

const POC_DATA_MAPPING = [
    { id: '1', label: 'Customer Information' },
	{ id: '2', label: 'Timeline' },
];

const INVOICE_MAPPING = {
	all: 'All Invoices',
	todays: "Today's Payables",
	delayed: 'Delayed',
	notDue: 'Not Due Invoices',
	disputed: 'Disputed',
};

const OFF_LABEL_SUPPLIER = {
	label: 'Supplier',
	value: true,
};
const ON_LABEL_SUPPLIER = {
	label: 'List',
	value: false,
};

const OFF_LABEL_PAYRUN = {
	label: 'Payrun',
	value: true,
};
const ON_LABEL_INVOICE = {
	label: 'Invoice',
	value: false,
};

const REMARKS = [
	{ name: 'MARK DISPUTED', value: 'DISPUTE' },
	// { name: 'MOVE TO DELAYED' },
	{ name: 'PUSH TO COE FINANCE', value: 'PUSH TO COE FINANCE' },
	// { name: 'REMARKS' },
];

const labelFunction = (entityCodeVal:string, entityName:string) => {
	return (
		<div style={{ alignItems: 'center', display: 'flex' }}>
			{entityCodeVal} -
			<span style={{ paddingTop: '4px', marginRight: '2px' }}>
				{entityCodeVal === '101' && <IcCCountryIndia height={15} width={15} />}
				{entityCodeVal === '201' && (
					<IcCCountryNetherland height={15} width={15} />
				)}
				{entityCodeVal === '301' && <IcCCountryIndia height={15} width={15} />}
				{entityCodeVal === '401' && (
					<IcCCountrySingapore height={15} width={15} />
				)}
			</span>
			{entityName}
		</div>
	);
};

const ENTITY_OPTIONS = [
	{
		label: labelFunction('101', 'COGO FREIGHT PVT LTD'),
		value: '101',
	},
	{
		label: labelFunction('201', 'Cogoport Netherlands'),
		value: '201',
	},
	{
		label: labelFunction('301', 'COGOPORT PRIVATE LIMITED'),
		value: '301',
	},
	{
		label: labelFunction('401', 'Cogo Universe Pte. Ltd'),
		value: '401',
	},
];

const loaderWrapperStyle = {
	height: '100%',
	width: '100%',
	position: 'fixed',
	background: 'rgba(0,0,0,0.3)',
	top: 0,
	left: 0,
	zIndex: 100,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const SAMPLE_LINK =
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/06679b4fca57a312ee8f3fe0ded72246/UTRuploadSampleFile.xlsx';

export {
	INVOICE_MAPPING,
	OFF_LABEL_SUPPLIER,
	ON_LABEL_SUPPLIER,
	REMARKS,
	ENTITY_OPTIONS,
	SAMPLE_LINK,
	OFF_LABEL_PAYRUN,
	ON_LABEL_INVOICE,
	CURRENCY_DATA,
	POC_DATA_MAPPING,
	loaderWrapperStyle,
};
