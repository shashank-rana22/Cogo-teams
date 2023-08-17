import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import injectCustomFormValidations from './inject-custom-form-validations';

const DEFAULT_CONTAINER_COUNT = 1;

const injectValues = ({
	populatedControls,
	task,
	getApisData,
	selectedMail = [],
	primary_service = {},
	shipment_data = {},
}) => {
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
					? controls[index]?.value : [{ url: selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.url }];
			}
		});
	} else if (
		['generate_do_certificate', 'generate_do_noc_certificate'].includes(
			task.task,
		)
	) {
		(controls || []).forEach((control, index) => {
			if (control.name === 'mbl_numbers') {
				const mblData = (getApisData?.list_shipment_bl_details || [])?.filter(
					(blDetailObj) => [
						'draft_bill_of_lading',
						'draft_local_bill_of_lading',
						'local_bill_of_lading',
					].includes(blDetailObj?.bl_document_type),
				);
				const MBL = [];
				(mblData || []).forEach((item) => {
					MBL.push(item?.bl_number);
				});

				controls[index].value = [...new Set(MBL)].join(', ');
			} else if (control.name === 'hbl_numbers') {
				const hblData = (getApisData?.list_shipment_bl_details || [])?.filter(
					(blDetailObj) => [
						'draft_house_bill_of_lading',
						'draft_local_house_bill_of_lading',
						'local_house_bill_of_lading',
					].includes(blDetailObj?.bl_document_type),
				);
				const HBL = [];
				(hblData || []).forEach((item) => {
					HBL.push(item?.bl_number);
				});

				controls[index].value = [...new Set(HBL)].join(', ') || undefined;
			} else if (
				control.type === 'fieldArray'
				&& control.name === 'container_number'
			) {
				controls[index].noDeleteButtonTill = primary_service.containers_count || DEFAULT_CONTAINER_COUNT;

				controls[index].value = (
					getApisData?.list_shipment_container_details || []
				).map((item) => ({
					number: item?.container_number,
				}));
			} else if (control.name === 'destination') {
				controls[index].value =	shipment_data?.freight_service?.destination_port?.name
					|| shipment_data?.destination_port?.name
					|| shipment_data.local_service?.port?.name;
			} else if (control.name === 'shipping_line') {
				controls[index].value =	shipment_data?.freight_service?.shipping_line?.business_name
				|| shipment_data?.local_service?.shipping_line?.business_name;
			}
		});
	}

	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;
