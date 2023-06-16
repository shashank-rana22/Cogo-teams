import { Layout } from '@cogoport/air-modules';
import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EditQuotations from './EditQuotations';
import useEditQuotations from './EditQuotations/useEditQuotations';
import getControls from './helper/getControls';
import getLocalControls from './helper/getLocalControls';
import getOtherControls from './helper/getOtherControls';
import styles from './styles.module.css';
import useUpdateServiceProvider from './updateServiceProviderFunc';

const EXPORT_INCOTERMS = ['ddp', 'dap', 'dat', 'cpt', 'cip', 'cif', 'cfr'];

function EditRate({
	task = {},
	servicesList = [],
	onCancel = () => {},
	shipment_data = {},
	refetch = () => {},
	formattedRate = {},
	localService = '',
	selectedCard = {},
}) {
	const [errors, setError] = useState({});

	const [airInput, setAirInput] = useState({
		airline_name          : '',
		service_provider_name : '',
	});

	const [localAirInput, setLocalAirInput] = useState({
		airline_name          : '',
		service_provider_name : '',
	});

	const mainAirFreight = (shipment_data?.all_services || []).find(
		(service) => service.service_type === 'air_freight_service',
	);

	const mainLocalAirFreight = (shipment_data?.all_services || []).find(
		(service) => service.service_type === 'air_freight_local_service',
	);

	const subsidiaryService = (shipment_data?.all_services || []).find(
		(service) => service.service_type === 'subsidiary_service'
			&& service.service_name === task?.subsidiary_service_name,
	);

	const trade_type = EXPORT_INCOTERMS.includes(mainAirFreight?.inco_term)
		? 'export'
		: 'import';

	const otherControls = getOtherControls(task?.service_type, trade_type);

	const formattedRateVal = formattedRate?.primary_service;

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		servicesList,
		subsidiaryService,
	});

	const handleAirChange = (obj, item) => {
		let { airline_name, service_provider_name } = airInput;
		if (item?.operator_type) {
			airline_name = item?.business_name;
		}
		if (item?.trade_name) {
			service_provider_name = item?.business_name;
		}
		setAirInput((prev) => ({
			...prev,
			airline_name,
			service_provider_name,
		}));
	};

	const handleAirLocalChange = (obj, item) => {
		let { airline_name, service_provider_name } = airInput;
		if (item?.operator_type) {
			airline_name = item?.business_name;
		}
		if (item?.trade_name) {
			service_provider_name = item?.business_name;
		}
		setLocalAirInput((prev) => ({
			...prev,
			airline_name,
			service_provider_name,
		}));
	};

	const requiredControls = requiredRawControls.map((ctrl) => ({
		...ctrl,
		value: formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name]
				|| ctrl.value,
		onChange: handleAirChange,
	}));

	const localRawControls = getLocalControls(
		task?.service_type,
		shipment_data,
		formattedRate,
	);

	const localControls = localRawControls.map((ctrl) => ({
		...ctrl,
		value: formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name]
				|| ctrl.value,
		onChange: handleAirLocalChange,
	}));

	const { control, handleSubmit, watch } = useForm({ requiredControls });

	const {
		control: controlForLocal,
		handleSubmit: handleSubmitLocal,
		watch: watchForLocal,
	} = useForm({ localControls });

	const { control: otherFieldControl, handleSubmit: otherHandleSubmit } = useForm({ otherControls });

	const { reallocationFunc } = useUpdateServiceProvider({
		handleSubmit,
		otherHandleSubmit,
		handleSubmitLocal,
		setError,
		errors,
		servicesList,
		localService,
		task,
	});

	const watchServiceProvider = {
		normal_service_provider : watch('service_provider_id'),
		local_service_provider  : watchForLocal('service_provider_id'),
		normal_airline          : watch('airline_id'),
		local_airline           : watchForLocal('airline_id'),
	};

	const editQuote = useEditQuotations({
		servicesList,
		shipment_data,
		onCancel,
		task,
		taskListRefetch: refetch,
		formattedRate,
		trade_type,
		selectedCard,
	});
	useEffect(() => {
		let airlineName;
		let localAirlineName;
		let serviceProviderName;
		let localServiceProviderName;
		if (!isEmpty(formattedRateVal)) {
			airlineName = formattedRateVal?.airline?.business_name;
			serviceProviderName = formattedRateVal?.service_provider?.business_name;
			localAirlineName = formattedRateVal?.airline?.business_name;
			localServiceProviderName = formattedRateVal?.service_provider?.business_name;
		} else if (!isEmpty(servicesList)) {
			(servicesList || []).forEach((service) => {
				if (service?.service_type === 'air_freight_service') {
					airlineName = service?.airline?.business_name;
					serviceProviderName = service?.service_provider?.business_name;
				}

				if (service?.service_type === 'subsidiary_service') {
					serviceProviderName = service?.service_provider?.business_name;
				}

				if (service?.service_type === 'air_freight_local_service') {
					localAirlineName = service?.airline?.business_name;
					localServiceProviderName = service?.service_provider?.business_name;
				}
			});
		} else {
			airlineName = mainAirFreight?.airline?.business_name;
			serviceProviderName = mainAirFreight?.service_provider?.business_name;
			localAirlineName = mainLocalAirFreight?.airline?.business_name;
			localServiceProviderName = mainLocalAirFreight?.service_provider?.business_name;
		}
		setAirInput({
			airline_name          : airlineName,
			service_provider_name : serviceProviderName,
		});
		setLocalAirInput({
			airline_name          : localAirlineName,
			service_provider_name : localServiceProviderName,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Quotation Update and Reallocation</div>
			<div className={styles.service_provider}>
				<Layout
					fields={requiredControls}
					control={control}
					errors={errors}
					shipment_id={task.shipment_id}
				/>
			</div>
			<div className={styles.service_provider}>
				<Layout
					fields={localControls}
					control={controlForLocal}
					errors={errors}
					shipment_id={task.shipment_id}
				/>
			</div>
			<div className={styles.service_provider}>
				<Layout
					fields={otherControls}
					control={otherFieldControl}
					errors={errors}
					shipment_id={task.shipment_id}
				/>
			</div>
			{editQuote.serviceQuotationLoading ? (
				<div className={styles.loading_container}>
					Loading Task....
					<Loader themeType="primary" className={styles.loader_icon} />
				</div>
			) : (
				<EditQuotations
					data={editQuote}
					shipment_id={task?.shipment_id}
					onCancel={onCancel}
					airInput={airInput}
					localAirInput={localAirInput}
					reallocationFunc={reallocationFunc}
					watchServiceProvider={watchServiceProvider}
				/>
			)}
		</div>
	);
}

export default EditRate;
