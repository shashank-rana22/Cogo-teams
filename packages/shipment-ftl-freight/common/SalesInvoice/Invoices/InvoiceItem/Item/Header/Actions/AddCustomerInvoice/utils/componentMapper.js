import dynamic from 'next/dynamic';

// import { getStylesInvoiceAdani } from '../Invoices/InvoiceAdani/styles.module.css';
// import { getStylesInvoiceExide } from '../Invoices/InvoiceExide/styles';
// import { getStylesInvoiceGujaratMilk } from '../Invoices/InvoiceGujaratMilk/styles';
// import { getStylesInvoiceHIL } from '../Invoices/InvoiceHIL/styles';
// import { getStylesInvoiceITC } from '../Invoices/InvoiceITC/styles';
// import { getStylesInvoiceIVL } from '../Invoices/InvoiceIVL/styles';
// import { getStylesInvoiceNerolac } from '../Invoices/InvoiceNerolac/styles';
// import { getStylesInvoiceOrissaMetaliks } from '../Invoices/InvoiceOrissaMetaliks/styles';
// import { getStylesInvoiceVarun } from '../Invoices/InvoiceVarun/styles';

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

export const componentMapper = {
	[shipperToPanMapping.ivl_dhunseri]: {
		component: InvoiceIVL,
	},
	[shipperToPanMapping.itc_limited]: {
		component: InvoiceITC,
	},
	[shipperToPanMapping.hil_limited]: {
		component: InvoiceHIL,
	},
	[shipperToPanMapping.gujarat_milk]: {
		component: InvoiceGujaratMilk,
	},
	[shipperToPanMapping.exide_industries]: {
		component: InvoiceExide,
	},
	[shipperToPanMapping.adani_wilmar]: {
		component: InvoiceAdani,
	},
	[shipperToPanMapping.varun_beverages]: {
		component: InvoiceVarun,
	},
	[shipperToPanMapping.orissa_metaliks]: {
		component: InvoiceOrissaMetaliks,
	},
	[shipperToPanMapping.kansai_nerolac]: {
		component: InvoiceNerolac,
	},
};
