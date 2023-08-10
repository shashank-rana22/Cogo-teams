import injectCustomFormValidations from './inject-custom-form-validations';

const injectValues = ({
	selectedMail,
	populatedControls,
	task,
	getApisData,
	shipment_data,
	stepConfig,
	primary_service,
}) => {
	const controls = populatedControls || [];

	if (!controls?.length) return controls;

	if (task?.task === 'upload_si') {
		controls[0].value = [
			{
				url         : selectedMail?.formatted?.[0]?.url,
				description : selectedMail?.formatted?.[0]?.description,
				si_filed_at : selectedMail?.formatted?.[0]?.si_filed_at,
			},
		];
	} else if (
		task?.task === 'upload_bill_of_lading' && shipment_data?.nomination_type !== 'agent'
	) {
		(controls || []).forEach((control, index) => {
			if (control?.type === 'fieldArray') {
				controls[index].value = (getApisData?.list_shipment_bl_details || [])
					?.filter(
						(blDetailObj) => blDetailObj?.bl_document_type === control?.document_type,
					)
					?.map((item) => {
						const bl_selected =	(selectedMail?.formatted || [])
							?.find((bl) => bl.document_number === item.bl_number) || {};

						return {
							description      : '',
							url              : bl_selected?.url || '',
							containers_count : bl_selected?.containers_count || '',
							document_number  : item.bl_number,
							bl_detail_id     : item.id,
						};
					});
			}
		});
	} else if (
		task?.task === 'upload_draft_bill_of_lading'
		&& stepConfig?.name === shipment_data.bl_category
	) {
		(controls || []).forEach((control, index) => {
			if (control?.type === 'fieldArray') {
				controls[index].value = Array(shipment_data.bls_count || 1)
					.fill(0)
					?.map(() => ({
						description : '',
						url         : selectedMail?.formatted?.[index]?.url || '',
						containers_count:
							selectedMail?.formatted?.[index]?.containers_count || '',
						document_number:
							selectedMail?.formatted?.[index]?.document_number || '',
					}));
			}
		});
	} else if (task?.task === 'upload_carting_order') {
		for (let index = 0; index < controls.length; index += 1) {
			if (controls[index].name === 'schedule_arrival') {
				controls[index].value =	new Date(shipment_data?.schedule_arrival
					|| shipment_data?.selected_schedule_arrival);
			}
			if (controls[index].name === 'schedule_departure') {
				controls[index].value =	new Date(shipment_data?.schedule_departure
					|| shipment_data?.selected_schedule_departure);
			}
			if (controls[index].name === 'movement_details') {
				controls[index].value = [
					{
						from_port_id     : primary_service?.origin_port_id,
						to_port_id       : primary_service?.destination_port_id,
						schedule_arrival : new Date(shipment_data?.schedule_arrival
							|| primary_service?.selected_schedule_arrival),
						schedule_departure: new Date(shipment_data?.schedule_departure
							|| primary_service?.selected_schedule_departure),
						vessel       : '',
						voyage       : '',
						service_type : 'lcl_freight_service',
					},
				];
			}
		}
	} else if (task?.task_type === 'upload_document') {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = controls[index]?.value?.length
					? controls[index]?.value : [{ url: selectedMail?.formatted?.[0]?.url }];
			}
		});
	}

	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;
