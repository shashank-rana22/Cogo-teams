import { Layout } from '@cogoport/air-modules';
import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import getDefaultValues from '../../utils/get-default-values';

import EditQuotations from './EditQuotations';
import useEditQuotations from './EditQuotations/useEditQuotations';
import getControls from './helper/getControls';
import getLocalControls from './helper/getLocalControls';
import getOtherControls from './helper/getOtherControls';
import styles from './styles.module.css';
import useUpdateServiceProvider from './updateServiceProviderFunc';

const EXPORT_INCOTERMS = ['ddp', 'dap', 'dat', 'cpt', 'cip', 'cif', 'cfr'];

const START_INDEX_FOR_ORIGIN_LOCAL = 0;
const START_INDEX_FOR_DESTINATION_LOCAL = 2;

function CustomLayout({ localControls = {}, controlForLocal = {}, errors = {}, task = {} }) {
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
		export : localControls.slice(START_INDEX_FOR_ORIGIN_LOCAL, START_INDEX_FOR_DESTINATION_LOCAL),
		import : localControls.slice(START_INDEX_FOR_DESTINATION_LOCAL),
	};

	return validation.map((service) => (
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

	const mainAirFreight = (shipment_data?.all_services || []).find(
		(service) => service.service_type === 'air_freight_service',
	);

	const subsidiaryService = (shipment_data?.all_services || []).find(
		(service) => service.service_type === 'subsidiary_service'
			&& service.service_name === task?.subsidiary_service_name,
	);

	const trade_type = EXPORT_INCOTERMS.includes(mainAirFreight?.inco_term)
		? 'export'
		: 'import';

	const otherControls = getOtherControls(task?.service_type, trade_type);

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		servicesList,
		subsidiaryService,
		shipment_data,
	});

	const requiredControls = requiredRawControls.map((ctrl) => ({
		...ctrl,
		value: formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name]
				|| ctrl.value,
	}));

	const localRawControls = getLocalControls(
		task?.service_type,
		formattedRate,
	);

	const defaultValues = getDefaultValues(requiredControls);

	const { control, handleSubmit, watch } = useForm({ defaultValues });

	const airServiceFormValues = watch();

	const localsDefaultValues = getDefaultValues(localRawControls);

	const {
		control: controlForLocal,
		handleSubmit: handleSubmitLocal,
		watch: watchForLocal,
	} = useForm({ localsDefaultValues });

	const airLocalServiceFormValues = watchForLocal();

	const otherControlsDefaultValues = getDefaultValues(otherControls);

	const { control: otherFieldControl, handleSubmit: otherHandleSubmit } = useForm({ otherControlsDefaultValues });

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
				localControls={localRawControls}
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
					service_type={task?.service_type}
					onCancel={onCancel}
					airServiceFormValues={airServiceFormValues}
					airLocalServiceFormValues={airLocalServiceFormValues}
					reallocationFunc={reallocationFunc}
					watchServiceProvider={watchServiceProvider}
				/>
			)}
		</div>
	);
}

export default EditRate;
