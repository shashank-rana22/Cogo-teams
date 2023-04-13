import injectCustomFormValidations from './inject-custom-form-validations';

const injectValues = (
	selectedMail,
	populatedControls,
	task,
	getApisData,
	shipment_data,
	stepConfig,
) => {
	const controls = populatedControls || [];
	if (task.task === 'upload_si') {
		controls[0].value = [
			{
				url         : selectedMail?.formatted?.[0]?.url,
				description : selectedMail?.formatted?.[0]?.description,
				si_filed_at : selectedMail?.formatted?.[0]?.si_filed_at,
			},
		];
	} else if (
		task.task === 'upload_bill_of_lading'
		&& shipment_data?.nomination_type !== 'agent'
	) {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = (getApisData?.list_shipment_bl_details || [])
					?.filter(
						(blDetailObj) => blDetailObj?.bl_document_type === control.document_type,
					)
					?.map((item) => {
						const bl_selected =							(selectedMail?.formatted || []).find(
							(bl) => bl.document_number === item.bl_number,
						) || {};
						return {
							description      : '',
							url              : bl_selected.url || '',
							containers_count : bl_selected.containers_count || '',
							document_number  : item.bl_number,
							bl_detail_id     : item.id,
						};
					});
			}
		});
	} else if (task.task === 'update_container_details') {
		const values = [];
		(getApisData?.list_shipment_container_details || []).forEach(
			(item, index) => {
				const remainingBls = (
					getApisData?.list_shipment_bl_details || []
				).filter((bl) => bl.bl_document_type === 'draft_bill_of_lading');
				const container_mail = selectedMail?.formatted?.[index];
				const container_number = container_mail?.container_number;
				const bl_number = container_mail?.bl_number;
				const bl_details =					(remainingBls || []).find((bl) => bl_number === bl.bl_number) || {};
				values.push({
					bl_id     : bl_details.id || '',
					bl_number : bl_details.bl_number
						? `${bl_details.bl_number}:${bl_details.id}`
						: '',
					container_number,
					id: item?.id,
				});
			},
		);
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = values;
			}
		});
	} else if (
		task.task === 'upload_draft_bill_of_lading'
		&& stepConfig?.name === shipment_data.bl_category
	) {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
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
	} else if (task?.task_type === 'upload_document') {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = controls[index].value?.length
					? controls[index].value
					: [
						{
							url: selectedMail?.formatted?.[0]?.url,
						},
					];
			}
		});
	}
	const validationAddedControls = injectCustomFormValidations(controls);
	return validationAddedControls;
};

export default injectValues;
