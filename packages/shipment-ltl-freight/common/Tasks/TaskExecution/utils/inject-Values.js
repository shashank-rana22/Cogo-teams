import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import injectCustomFormValidations from './inject-custom-form-validations';

const injectValues = ({
	selectedMail,
	populatedControls,
	task,
	servicesList,
}) => {
	const controls = populatedControls || [];
	const ltlService = (servicesList || []).find(
		(obj) => obj.service_type === 'ltl_freight_service' && ['first', 'mid', 'last'].includes(obj?.mile_number),
	);
	if (!controls?.length) return controls;

	if (task?.task_type === 'upload_document') {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = controls[index]?.value?.length
					? controls[index]?.value : [{ url: selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.url }];
			}
		});
	}
	if (task.task === 'confirm_cargo_details') {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = [
					{
						unit          : ltlService?.packages.length,
						actual_weight : ltlService?.weight,
						chargable_weight:
						ltlService?.chargable_weight || ltlService?.weight,
					},
				];
			}
		});
	}

	if (task.task === 'upload_proof_of_delivery') {
		(controls || []).forEach((control, index) => {
			if (control.name === 'documents') {
				controls[index].value = [
					{
						url             : '',
						lr_number       : ltlService.lr_number,
						incedental_cost : '',
						delivery_date   : '',
					},
				];
			}
		});
	}

	if (task.task === 'tag_service_providers') {
		const lastMileIndex = (servicesList || []).findIndex(
			(service) => service?.mile_number === 'last',
		);
		const firstMileIndex = (servicesList || []).findIndex(
			(service) => service?.mile_number === 'first',
		);
		(controls || []).forEach((control, index) => {
			const serviceProviderIndex = servicesList.find(
				(item) => item.mile_number === control.name,
			);

			controls[index].value = [
				{
					service_id          : serviceProviderIndex?.id,
					service_provider_id : '',
				},
			];

			if (control.name === 'first') {
				controls[index].value = [
					{
						mile_number : 'first',
						origin      : servicesList[firstMileIndex]?.origin_location_id,
						service_id  : serviceProviderIndex?.id,
					},
				];
			}

			if (control.name === 'mid') {
				controls[index].value = [
					{
						mile_number         : 'mid',
						service_id          : serviceProviderIndex?.id,
						service_provider_id : '',
					},
				];
			}

			if (control.name === 'last') {
				controls[index].value = [
					{
						mile_number : 'last',
						destination : servicesList[lastMileIndex]?.destination_location_id,
						service_id  : serviceProviderIndex?.id,
					},
				];
			}
		});
	}

	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;
