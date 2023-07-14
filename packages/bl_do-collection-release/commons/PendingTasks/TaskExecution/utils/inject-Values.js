import injectCustomFormValidations from './inject-custom-form-validations';

const injectValues = (
	populatedControls,
	task,
	getApisData,
	selectedMail = [],
) => {
	const controls = populatedControls || [];

	if (!controls?.length) return controls;

	if (task?.task === 'upload_bill_of_lading') {
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
