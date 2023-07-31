import dynamic from 'next/dynamic';

import { SHIPPER_TO_PAN_MAPPINGS } from './serviceDescriptionMappings';

const InvoiceIVL = dynamic(() => import('../Invoices/InvoiceIVL'));
const InvoiceITC = dynamic(() => import('../Invoices/InvoiceITC'));
const InvoiceHIL = dynamic(() => import('../Invoices/InvoiceHIL'));
const InvoiceGujaratMilk = dynamic(() => import('../Invoices/InvoiceGujaratMilk'));
const InvoiceExide = dynamic(() => import('../Invoices/InvoiceExide'));
const InvoiceAdani = dynamic(() => import('../Invoices/InvoiceAdani'));
const InvoiceVarun = dynamic(() => import('../Invoices/InvoiceVarun'));
const InvoiceOrissaMetaliks = dynamic(() => import('../Invoices/InvoiceOrissaMetaliks'));
const InvoiceNerolac = dynamic(() => import('../Invoices/InvoiceNerolac'));
const InvoiceDefault = dynamic(() => import('../Invoices/InvoiceDefault'));

export const componentMapper = {
	[SHIPPER_TO_PAN_MAPPINGS.ivl_dhunseri]     : InvoiceIVL,
	[SHIPPER_TO_PAN_MAPPINGS.itc_limited]      : InvoiceITC,
	[SHIPPER_TO_PAN_MAPPINGS.hil_limited]      : InvoiceHIL,
	[SHIPPER_TO_PAN_MAPPINGS.gujarat_milk]     : InvoiceGujaratMilk,
	[SHIPPER_TO_PAN_MAPPINGS.exide_industries] : InvoiceExide,
	[SHIPPER_TO_PAN_MAPPINGS.adani_wilmar]     : InvoiceAdani,
	[SHIPPER_TO_PAN_MAPPINGS.varun_beverages]  : InvoiceVarun,
	[SHIPPER_TO_PAN_MAPPINGS.orissa_metaliks]  : InvoiceOrissaMetaliks,
	[SHIPPER_TO_PAN_MAPPINGS.kansai_nerolac]   : InvoiceNerolac,
};

export const getComponentMapping = (registration_number) => {
	if (registration_number in componentMapper) {
		return componentMapper[registration_number];
	}

	return InvoiceDefault;
};
