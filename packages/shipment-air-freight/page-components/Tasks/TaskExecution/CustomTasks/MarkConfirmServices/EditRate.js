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
const CONSTANT_ZERO = 0;
const CONSTANT_TWO = 2;

function CustomLayout({ localControls, controlForLocal, errors, task }) {
	return (
		<Layout
			fields={localControls}
			control={controlForLocal}
			errors={errors}
			shipment_id={task.shipment_id}
		/>
	);
}

function LocalsLayout(props) {
	const { shipment_data, localControls } = props;
	const validation = shipment_data?.all_services?.filter((service) => (
		service.service_type === 'air_freight_local_service'
	));
	const CONTROLS_MAPPING = {
		export : localControls.slice(CONSTANT_ZERO, CONSTANT_TWO),
		import : localControls.slice(CONSTANT_TWO),
	};

	return validation.reverse().map((service) => (
		<div className={styles.service_provider} key={service.id}>
			<CustomLayout
				{...props}
				validation={validation}
				localControls={CONTROLS_MAPPING[service.trade_type]}
			/>
		</div>
	));
}

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
		airline_id          : '',
		service_provider_id : '',
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

	const formattedRateVal = formattedRate?.[formattedRate?.primary_service?.id];

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		servicesList,
		subsidiaryService,
	});

	const handleAirChange = (obj, item) => {
		let { airline_id, service_provider_id } = airInput;
		if (item?.operator_type) {
			airline_id = obj;
		}
		if (item?.trade_name) {
			service_provider_id = obj;
		}
		setAirInput((prev) => ({
			...prev,
			airline_id,
			service_provider_id,
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
		let airlineId;
		let localAirlineId;
		let serviceProviderId;
		let localServiceProviderId;
		if (!isEmpty(formattedRateVal)) {
			airlineId = formattedRateVal?.airline_id;
			serviceProviderId = formattedRateVal?.service_provider_id;
			localAirlineId = formattedRateVal?.airline_id;
			localServiceProviderId = formattedRateVal?.service_provider_id;
		} else if (!isEmpty(servicesList)) {
			(servicesList || []).forEach((service) => {
				if (service?.service_type === 'air_freight_service') {
					airlineId = service?.airline?.id;
					serviceProviderId = service?.service_provider?.id;
				}

				if (service?.service_type === 'subsidiary_service') {
					serviceProviderId = service?.service_provider?.id;
				}

				if (service?.service_type === 'air_freight_local_service') {
					localAirlineId = service?.airline?.id;
					localServiceProviderId = service?.service_provider?.id;
				}
			});
		} else {
			airlineId = mainAirFreight?.airline_id;
			serviceProviderId = mainAirFreight?.service_provider_id;
			localAirlineId = mainLocalAirFreight?.airline_id;
			localServiceProviderId = mainLocalAirFreight?.service_provider_id;
		}
		setAirInput({
			airline_id          : airlineId,
			service_provider_id : serviceProviderId,
		});
		setLocalAirInput({
			airline_id          : localAirlineId,
			service_provider_id : localServiceProviderId,
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
			<LocalsLayout
				localControls={localControls}
				controlForLocal={controlForLocal}
				errors={errors}
				task={task}
				customLabel="Destination"
				shipment_data={shipment_data}
			/>
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
