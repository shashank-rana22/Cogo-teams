import { startCase } from '@cogoport/utils';

import injectCustomFormValidations from './inject-custom-form-validations';

const injectValues = ({
	selectedMail,
	populatedControls,
	task = {},
	getApisData,
	shipment_data,
	stepConfig,
	primary_service,
}) => {
	const controls = populatedControls || [];

	if (!controls?.length) return controls;

	if (['confirm_booking', 'confirmation_of_booking_with_service_provider'].includes(task.task)) {
		const data = getApisData
			?.list_shipment_services
			?.filter((i) => i?.service_type === 'rail_domestic_freight_service');

		(controls || []).forEach((control, index) => {
			controls[index].value = data[0]?.[control.name];

			if (control.type === 'fieldArray') {
				controls[index].value = data?.map((item) => ({
					container_type             : startCase(item?.container_type),
					containers_count           : item?.containers_count,
					cargo_weight_per_container : item?.cargo_weight_per_container,
					container_size             : item?.container_size,
					commodity                  : startCase(item?.commodity),
				}));
			}
		});
	} else if (task.task_type === 'upload_document') {
		(controls || []).forEach((control, index) => {
			if (control?.type === 'fieldArray') {
				controls[index].value = controls[index]?.value?.length ? controls[index]?.value
					: [{ url: selectedMail?.formatted?.[0]?.url }];
			}
		});
	}

	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;
