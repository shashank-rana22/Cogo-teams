const payloadMapping = {
	ftl_freight: {
		mandatory_docs_upload: {
			shipment_type : 'ftl_freight',
			state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			pending_tasks : {
				status    : 'pending',
				mandatory : true,
			},
		},
		optional_docs_upload: {
			shipment_type : 'ftl_freight',
			state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			pending_tasks : {
				status    : 'pending',
				mandatory : false,
			},
		},
		proforma_invoice: {
			shipment_type : 'ftl_freight',
			state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			invoice_type  : 'proforma_invoice',
		},
		e_pod: {
			shipment_type : 'ftl_freight',
			state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			pending_tasks : {
				task   : 'upload_proof_of_delivery',
				status : 'pending',
			},

		},
		physical_pod_service_provider: {
			shipment_type : 'ftl_freight',
			state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			pending_tasks : {
				task   : 'upload_service_provider_proof_of_delivery',
				status : 'pending',
			},
		},
		purchase_invoice: {
			shipment_type : 'ftl_freight',
			state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			invoice_type  : 'purchase_invoice',
		},
		eway_bill_validity: {
			shipment_type : 'ftl_freight',
			state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
		},
		completed_shipment: {
			shipment_type : 'ftl_freight',
			state         : 'completed',
		},
		cancelled_shipment: {
			shipment_type : 'ftl_freight',
			state         : 'cancelled',
		},

	},
};
export default payloadMapping;
