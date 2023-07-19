import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect } from 'react';

import getDefaultValues from '../utils/get-default-values';
import injectForm from '../utils/inject-form';
import injectValues from '../utils/inject-Values';
import populateControls from '../utils/populate-controls';

const geo = getGeoConstants();
function useStepExecution({
	task = {},
	stepConfig = {},
	getApisData = {},
	selectedMail = {},
	shipment_data = {},
	primary_service = {},
	services = [],
	tradeType = '',
}) {
	const mainAirFreight = (services || []).find(
		(service) => service?.service_type === 'air_freight_service',
	);

	const populatedControls = populateControls({
		controls: stepConfig.controls,
		getApisData,
		task,
		primary_service,
		mainAirFreight,
		tradeType,
	});

	const valueInjectedControls = injectValues({
		selectedMail,
		populatedControls,
		task,
	});

	const defaultValues = getDefaultValues(valueInjectedControls);

	const formProps = useForm({ defaultValues });

	const formValues = formProps?.watch();

	const { controls, showElements } = injectForm({
		stepConfig,
		formProps,
		formValues,
		task,
		shipment_data,
	});

	useEffect(() => {
		if (
			task.task === 'update_airway_bill_number'
			&& formValues.booking_ref_status === 'placed'
			&& mainAirFreight?.service_provider_id === geo.uuid.freight_force_org_id
			&& getApisData?.get_awb_inventory_data?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.awb_number
			&& !getApisData?.list_platform_config_constants?.[GLOBAL_CONSTANTS.zeroth_index]
				?.platform_config_constant_mappings[GLOBAL_CONSTANTS.zeroth_index]?.value[primary_service?.airline_id]
		) {
			Toast.info(
				'AWB stock is not available, please contact to inventory manager',
			);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formValues.booking_ref_status]);

	return {
		fields: controls,
		formProps,
		showElements,
	};
}
export default useStepExecution;
