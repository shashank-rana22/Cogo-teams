import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';

import getDefaultValues from '../../utils/get-default-values';

import getControls from './helper/getControls';
import useGetRateData from './helper/useGetRateData';
import Rate from './Rate';
import styles from './styles.module.css';

function EditRate({
	task = {},
	servicesList = [],
	onCancel = () => {},
	shipment_data = {},
	refetch = () => {},
	formattedRate = {},
}) {
	const editQuote = useGetRateData({
		servicesList,
		shipment_data,
		onCancel,
		task,
		taskListRefetch: refetch,
	});

	const subsidiaryService = (servicesList || []).find((service) => service.service_type === 'subsidiary_service'
		&& service.id === task?.service_id);

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		servicesList,
		subsidiaryService,
	});

	const requiredControls = requiredRawControls.map((ctrl) => ({
		...ctrl,
		value: formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name] || ctrl.value,
	}));

	const defaultValues = getDefaultValues(requiredControls);

	const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Quotation Update and Reallocation</div>

			{/* <div className={styles.service_provider}>
				<Layout
					fields={requiredControls}
					control={control}
					errors={errors}
				/>
			</div> */}

			{editQuote.serviceQuotationLoading ? (
				<div className={styles.loading_container}>
					Loading Task....
					<Loader themeType="primary" className={styles.loader_icon} />
				</div>
			) : (
				<Rate
					data={editQuote}
					serviceProviderSubmit={handleSubmit}
					servicesList={servicesList}
					task={task}
					formattedRate={formattedRate}
				/>
			)}
		</div>
	);
}

export default EditRate;
