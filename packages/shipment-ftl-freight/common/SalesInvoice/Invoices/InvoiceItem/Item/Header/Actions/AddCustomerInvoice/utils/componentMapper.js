import dynamic from 'next/dynamic';

import { shipperToPanMapping } from './serviceDescriptionMappings';

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
	[shipperToPanMapping.ivl_dhunseri]     : InvoiceIVL,
	[shipperToPanMapping.itc_limited]      : InvoiceITC,
	[shipperToPanMapping.hil_limited]      : InvoiceHIL,
	[shipperToPanMapping.gujarat_milk]     : InvoiceGujaratMilk,
	[shipperToPanMapping.exide_industries] : InvoiceExide,
	[shipperToPanMapping.adani_wilmar]     : InvoiceAdani,
	[shipperToPanMapping.varun_beverages]  : InvoiceVarun,
	[shipperToPanMapping.orissa_metaliks]  : InvoiceOrissaMetaliks,
	[shipperToPanMapping.kansai_nerolac]   : InvoiceNerolac,
};

export const getComponentMapping = (registration_number) => {
	if (registration_number in componentMapper) {
		return componentMapper[registration_number];
	}

	return InvoiceDefault;
};
