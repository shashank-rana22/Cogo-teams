import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import injectCustomFormValidations from './inject-custom-form-validations';

const FALLBACK_VALUE = 1;
const injectValues = ({
	selectedMail,
	populatedControls,
	task,
	getApisData,
	shipment_data,
	stepConfig,
}) => {
	const controls = populatedControls || [];

	if (!controls?.length) return controls;

	if (task?.task === 'upload_si') {
		controls[GLOBAL_CONSTANTS.zeroth_index].value = [
			{
				url         : selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.url,
				description : selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.description,
				si_filed_at : selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.si_filed_at,
			},
		];
	} else if (
		task?.task === 'upload_bill_of_lading'
		&& shipment_data?.nomination_type !== 'agent'
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
				controls[index].value = Array(shipment_data.bls_count || FALLBACK_VALUE)
					.fill(GLOBAL_CONSTANTS.zeroth_index)
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
				controls[index].value = controls[index]?.value?.length
					? controls[index]?.value : [{ url: selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.url }];
			}
		});
	} else if (task?.task === 'mark_container_gated_out') {
		const containerDetails = getApisData?.list_shipment_container_details || [];

		(controls || []).forEach((control, index) => {
			if (control.name === 'containers_gated_out') {
				controls[index].value = containerDetails.map((i) => ({
					container_number : i?.container_number,
					id               : i?.id,
					gated_out_at     : '',
				}));
			}
		});
	}

	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;
