const excludeDocs = {
	export: [
		{ doc_code: 'XX_BOL.pdf', doc_name: 'Bill of Lading' },
		{ doc_code: 'XX_CI.pdf', doc_name: 'Commercial Invoice' },
		{ doc_code: 'XX_PL.pdf', doc_name: 'Packing List' },
		{ doc_code: 'XX_PI.pdf', doc_name: 'Proforma Invoice' },
		{ doc_code: 'XX_SWB.pdf', doc_name: 'Sea Waybill' },
		{ doc_code: 'IN_EXP_SBDG.pdf', doc_name: 'Shipping Bill for export of dutiable goods' },
		{ doc_code: 'IN_EXP_SBDF.pdf', doc_name: 'Shipping Bill for export of duty free goods' },
		{ doc_code: 'IN_EXP_DFGEX.pdf', doc_name: 'Shipping Bill for export of duty free goods ex-bond' },
		{ doc_code: 'IN_EXP_DBK.pdf', doc_name: 'Shipping Bill for export of goods under claim for duty drawback' },
		{ doc_code: 'EU_EXP_LL.pdf', doc_name: 'Loading List' },
		{ doc_code: 'XX_AWB.pdf', doc_name: 'Air Waybill' },
	],
	import: [
		{ doc_code: 'IN_IMP_BOEEB.pdf', doc_name: 'Bill of Entry for Ex-bond Clearance for Home Consumption' },
		{ doc_code: 'IN_IMP_BOE.pdf', doc_name: 'Bill of Entry for Home Consumption' },
		{ doc_code: 'IN_IMP_BOEWH.pdf', doc_name: 'Bill of Entry for Warehousing' },
		{ doc_code: 'IN_IMP_DO.pdf', doc_name: 'Delivery Order' },
	],
};

export default excludeDocs;
