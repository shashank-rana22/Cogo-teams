const payloadMapping = {
	ftl_freight: {
		mandatory_docs_upload: {
			shipment_type : 'ftl_freight',
			pending_tasks : {
				task_type : 'upload_document',
				mandatory : true,
			},
		},
		optional_docs_upload: {
			shipment_type : 'ftl_freight',
			pending_tasks : {
				task_type : 'upload_document',
				mandatory : false,
			},
		},
		proforma_invoice: {
			shipment_type : 'ftl_freight',
			invoice_type  : 'proforma_invoice',
		},
		e_pod: {
			shipment_type : 'ftl_freight',
			pending_tasks : {
				task: 'upload_proof_of_delivery',
			},

		},
		physical_pod_service_provider: {
			shipment_type : 'ftl_freight',
			pending_tasks : {
				task: 'upload_service_provider_proof_of_delivery',
			},
		},
		purchase_invoice: {
			shipment_type : 'ftl_freight',
			invoice_type  : 'purchase_invoice',
		},

	},
	rail_domestic_freight: {
		upload_purchase_invoice: {
			shipment_type: 'rail_domestic_freight',
		},
	},
};
export default payloadMapping;
