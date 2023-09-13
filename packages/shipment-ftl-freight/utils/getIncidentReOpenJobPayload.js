const LEVELS_FOR_APPROVAL = ['LEVEL_1', 'LEVEL_2'];

const getIncidentReOpenJobPayload = ({ values = {}, shipmentData = {}, user_id = '' }) => ({
	type            : 'JOB_OPEN',
	incidentSubType : shipmentData?.shipment_type?.toUpperCase(),
	data            : {
		jobOpenRequest: {
			id        : shipmentData?.id,
			jobNumber : shipmentData?.serial_id,

			remark       : values?.remark,
			documentUrls : [values?.proof_url?.finalUrl],
		},
		organization: {
			businessName: shipmentData?.importer_exporter?.business_name,
		},
	},
	toWhomToSendForApproval : LEVELS_FOR_APPROVAL,
	createdBy               : user_id,
	source                  : 'SHIPMENT',

});

export default getIncidentReOpenJobPayload;
