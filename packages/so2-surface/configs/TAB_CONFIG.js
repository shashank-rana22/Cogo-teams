const TAB_CONFIG = {
	ftl_freight: [
		{
			label   : 'Mandatory Docs Upload',
			value   : 'mandatory_docs_upload',
			stats   : 'mandatory_documents',
			payload : {
				shipment_type : 'ftl_freight',
				pending_task  : {
					task_type : 'upload_document',
					mandatory : true,
				},
			},
		},
		{
			label   : 'Optional Docs Upload',
			value   : 'optional_docs_upload',
			stats   : 'non_mandatory_documents',
			payload : {
				shipment_type : 'ftl_freight',
				pending_task  : {
					task_type : 'upload_document',
					mandatory : false,
				},
			},
		},
		{
			label   : 'Proforma Invoice',
			value   : 'proforma_invoice',
			stats   : 'un_uploaded_proforma_invoice',
			payload : {
				shipment_type : 'ftl_freight',
				invoice_type  : 'proforma_invoice',
			},
		},
		{
			label   : 'E-PoD',
			value   : 'e_pod',
			stats   : 'e_pod',
			payload : {
				shipment_type : 'ftl_freight',
				pending_task  : {
					task_type : 'upload_document',
					task      : 'upload_proof_of_delivery',
				},
			},
		},
		{
			label   : 'Physical PoD from Service Provider',
			value   : 'physical_pod_service_provider',
			stats   : 'physical_pod_from_service_provider',
			payload : {
				shipment_type : 'ftl_freight',
				pending_task  : {
					task_type : 'upload_document',
					task      : 'upload_service_provider_proof_of_delivery',
				},
			},
		},
		{
			label   : 'Physical PoD to Customer',
			value   : 'physical_pod_customer',
			stats   : 'physical_to_pod_customer',
			payload : {
				shipment_type : 'ftl_freight',
				pending_task  : {
					task_type : 'upload_document',
					task      : 'pod_sent_to_shipper',
				},
			},

		},
		{
			label   : 'Purchase Invoice',
			value   : 'purchase_invoice',
			stats   : 'un_uploaded_purchase_invoice',
			payload : {
				shipment_type : 'ftl_freight',
				invoice_type  : 'purchase_invoice',
			},
		},
	],
};
const TabContainer = () => TAB_CONFIG;
export default TabContainer;
