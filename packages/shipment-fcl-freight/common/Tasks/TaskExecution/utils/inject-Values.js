import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import injectCustomFormValidations from './inject-custom-form-validations';

const MINIMUM_BLS_COUNT = 1;
const MINIMUM_CONTAINERS_COUNT = 1;

const injectValues = ({
	selectedMail,
	populatedControls,
	task,
	getApisData,
	shipment_data,
	stepConfig,
	setCommodityUnit = () => {},
}) => {
	const controls = populatedControls || [];

	if (!controls?.length) return controls;

	const containerDetails = getApisData?.list_shipment_container_details || [];
	const containersCount = containerDetails.length || MINIMUM_CONTAINERS_COUNT;

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
		controls.forEach((control, index) => {
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
		controls.forEach((control, index) => {
			if (control?.type === 'fieldArray') {
				controls[index].value = Array(shipment_data.bls_count || MINIMUM_BLS_COUNT)
					.fill(null)
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
		controls.forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = controls[index]?.value?.length
					? controls[index]?.value : [{ url: selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.url }];
			}
		});
	} else if (task?.task === 'mark_container_gated_out') {
		controls.forEach((control, index) => {
			if (control.name === 'containers_gated_out') {
				controls[index].value = containerDetails.map((i) => ({
					container_number : i?.container_number,
					id               : i?.id,
					gated_out_at     : '',
				}));
			}
		});
	} else if (task.task === 'mark_vessel_departed') {
		controls.forEach((control, index) => {
			if (task.state === 'containers_gated_in'
				&& control.name === 'containers_count'
			) {
				controls[index].value = containersCount;
				controls[index].rules.max = containersCount;
			} else if (control.type === 'fieldArray') {
				controls[index].value = containerDetails.map((containerObj) => ({
					container_number : containerObj.container_number,
					id               : containerObj.id,
				}));
			}
		});
	} else if (
		['update_mbl_collection_status', 'update_hbl_collection_status'].includes(task?.task)) {
		const doc_type = task.task === 'update_hbl_collection_status'
			? 'draft_house_bill_of_lading' : 'draft_bill_of_lading';

		(controls || []).forEach((control, index) => {
			if (control.name === 'bl_detail') {
				const shipment_bl_details =	getApisData?.list_shipment_bl_details?.filter(
					(i) => i?.bl_document_type === doc_type,
				);

				controls[index].value = shipment_bl_details?.map((bl_detail) => ({
					id        : bl_detail?.id,
					bl_number : bl_detail?.bl_number,
				}));
			}
		});
	} else if (task.task === 'mark_container_gated_in') {
		(controls || []).forEach((control, index) => {
			if (control.name === 'containers_count') {
				controls[index].value = containersCount;
				controls[index].rules.max = containersCount;
			}
		});
	} else if (task?.task === 'mark_confirmed') {
		(controls || []).forEach((ctrl, index) => {
			if (ctrl?.name === 'commodity_category') {
				if (shipment_data?.commodity_category) {
					controls[index].value = shipment_data?.commodity_category;
					controls[index].disabled = !!shipment_data?.commodity_category;
				}
			}

			if (ctrl?.name === 'hs_code') {
				controls[index].onChange = (val, obj) => {
					setCommodityUnit(obj);
				};
			}
		});
	}

	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;
