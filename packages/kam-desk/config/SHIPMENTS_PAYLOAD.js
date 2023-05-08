const tabPayload = {
	fcl_freight: {
		export: {
			mark_confirmed: {
				trade_type      : 'export',
				state           : ['shipment_received'],
				task_attributes : [
					{
						task                 : 'mark_confirmed',
						status               : 'pending',
						assigned_stakeholder : 'booking_agent',
					},
				],
			},
			upload_booking_note: {
				trade_type      : 'export',
				task_attributes : [
					{
						task   : 'upload_booking_note',
						status : 'pending',
					},
				],
			},
			update_container_details: {
				trade_type      : 'export',
				task_attributes : [
					{
						task   : 'update_container_details',
						status : 'pending',
					},
				],
			},
			list_task_pending: {
				trade_type      : 'export',
				task_attributes : [
					{
						task   : ['upload_packing_list', 'upload_si', 'upload_invoice'],
						status : 'pending',
					},
				],
			},
			document_approval: {
				state               : 'in_progress',
				trade_type          : 'export',
				bl_approval_pending : true,
			},
			vessel_departed: {
				trade_type    : 'export',
				state         : 'in_progress',
				service_state : 'vessel_departed',
			},
			vessel_arrived: {
				trade_type    : 'export',
				state         : 'in_progress',
				service_state : 'vessel_arrived',
			},
			completed : { trade_type: 'export', state: 'completed' },
			cancelled : { trade_type: 'export', state: 'cancelled' },
		},
		import: {
			mark_confirmed: {
				trade_type      : 'import',
				state           : ['shipment_received'],
				task_attributes : [
					{
						task                 : 'mark_confirmed',
						status               : 'pending',
						assigned_stakeholder : 'booking_agent',
					},
				],
			},
			upload_shipping_order: {
				trade_type      : 'import',
				task_attributes : [
					{
						task   : 'upload_booking_note',
						status : 'pending',
					},
				],
			},
			list_task_pending: {
				trade_type      : 'import',
				task_attributes : [
					{
						task   : ['upload_packing_list', 'upload_si', 'upload_invoice'],
						status : 'pending',
					},
				],
			},
			document_approval: {
				trade_type          : 'import',
				bl_approval_pending : true,
				state               : 'in_progress',
			},
			vessel_departed: {
				trade_type    : 'import',
				service_state : 'vessel_departed',
				state         : 'in_progress',
			},
			vessel_arrived: {
				trade_type    : 'import',
				service_state : 'vessel_arrived',
				state         : 'in_progress',
			},
			completed : { trade_type: 'import', state: 'completed' },
			cancelled : { trade_type: 'import', state: 'cancelled' },
		},
		fcl_customs: {
			mark_confirmed: {
				state           : 'shipment_received',
				task_attributes : [
					{
						task   : 'mark_confirmed',
						status : 'pending',
					},
				],
			},
			mark_completed: {
				task_attributes: [
					{
						task   : 'mark_completed',
						status : 'pending',
					},
				],
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
		fcl_local: {
			mark_confirmed: {
				state           : 'shipment_received',
				task_attributes : [
					{
						task   : 'mark_confirmed',
						status : 'pending',
					},
				],
			},
			update_container_details: {
				task_attributes: [
					{
						task   : 'update_container_details',
						status : 'pending',
					},
				],
			},
			document_approval: {
				bl_approval_pending : 'pending',
				do_approval_pending : 'pending',
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
	},
	lcl_freight: {
		export: {
			confirm_booking: {
				trade_type      : 'export',
				state           : ['shipment_received'],
				task_attributes : [
					{
						task                 : 'confirm_booking',
						status               : 'pending',
						assigned_stakeholder : 'booking_agent',
					},
				],
			},
			list_task_pending: {
				trade_type      : 'export',
				task_attributes : [
					{
						task   : ['upload_si', 'upload_invoice'],
						status : 'pending',
					},
				],
			},
			upload_carting_order: {
				trade_type      : 'export',
				task_attributes : [
					{
						task   : 'upload_carting_order',
						status : 'pending',
					},
				],
			},
			document_approval: {
				state               : 'in_progress',
				trade_type          : 'export',
				bl_approval_pending : true,
			},
			vessel_departed: {
				trade_type    : 'export',
				state         : 'in_progress',
				service_state : 'vessel_departed',
			},
			vessel_arrived: {
				trade_type    : 'export',
				state         : 'in_progress',
				service_state : 'vessel_arrived',
			},
			completed : { trade_type: 'export', state: 'completed' },
			cancelled : { trade_type: 'export', state: 'cancelled' },
		},
		import: {
			confirm_booking: {
				trade_type      : 'import',
				state           : ['shipment_received'],
				task_attributes : [
					{
						task                 : 'confirm_booking',
						status               : 'pending',
						assigned_stakeholder : 'booking_agent',
					},
				],
			},
			list_task_pending: {
				trade_type      : 'import',
				task_attributes : [
					{
						task   : ['upload_si', 'upload_invoice'],
						status : 'pending',
					},
				],
			},
			upload_carting_order: {
				trade_type      : 'import',
				task_attributes : [
					{
						task   : 'upload_carting_order',
						status : 'pending',
					},
				],
			},
			document_approval: {
				state               : 'in_progress',
				trade_type          : 'import',
				do_approval_pending : true,
			},
			vessel_departed: {
				trade_type    : 'import',
				state         : 'in_progress',
				service_state : 'vessel_departed',
			},
			vessel_arrived: {
				trade_type    : 'import',
				state         : 'in_progress',
				service_state : 'vessel_arrived',
			},
			completed : { trade_type: 'import', state: 'completed' },
			cancelled : { trade_type: 'import', state: 'cancelled' },
		},
		lcl_customs: {
			mark_confirmed: {
				state           : 'shipment_received',
				task_attributes : [
					{
						task   : 'mark_confirmed',
						status : 'pending',
					},
				],
			},
			in_progress: {
				task_attributes: [
					{
						task   : 'mark_completed',
						status : 'pending',
					},
				],
			},
			cancelled : { state: 'cancelled' },
			completed : { state: 'completed' },
		},
	},
	air_freight: {
		air_freight: {
			ongoing: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
				],
				shipment_type: 'air_freight',
			},
			completed : { state: 'completed', shipment_type: 'air_freight' },
			cancelled : { state: 'cancelled', shipment_type: 'air_freight' },
		},
		domestic_air_freight: {
			ongoing: {
				state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
				shipment_type : 'domestic_air_freight',
			},
			completed : { state: 'completed', shipment_type: 'domestic_air_freight' },
			cancelled : { state: 'cancelled', shipment_type: 'domestic_air_freight' },
		},
		air_customs: {
			ongoing: {
				state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
				shipment_type : 'air_customs',
			},
			completed : { state: 'completed', shipment_type: 'air_customs' },
			cancelled : { state: 'cancelled', shipment_type: 'air_customs' },
		},
		air_freight_local: {
			ongoing: {
				state         : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
				shipment_type : 'air_freight_local',
			},
			completed : { state: 'completed', shipment_type: 'air_freight_local' },
			cancelled : { state: 'cancelled', shipment_type: 'air_freight_local' },
		},
	},
};

export default tabPayload;
