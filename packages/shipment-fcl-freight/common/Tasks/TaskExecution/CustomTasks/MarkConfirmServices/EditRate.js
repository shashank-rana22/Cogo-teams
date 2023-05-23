import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import FormLayout from '../../helpers/Layout';
import getDefaultValues from '../../utils/get-default-values';
import Step3 from '../UploadBookingNote/components/Step3';
import useGetStep3Data from '../UploadBookingNote/helpers/useGetStep3Data';

import getControls from './helper/getControls';
import styles from './styles.module.css';

function EditRate({
	task = {},
	servicesList = [],
	onCancel = () => {},
	shipment_data = {},
	refetch = () => {},
	formattedRate = {},
}) {
	const editQuote = useGetStep3Data({
		servicesList    : servicesList.filter((item) => item.id === task.service_id),
		shipment_data,
		onCancel,
		task,
		taskListRefetch : refetch,
	});

	const subsidiaryService = (servicesList || []).find(
		(service) => service.service_type === 'subsidiary_service'
			&& service.id === task?.service_id,
	);

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		servicesList,
		subsidiaryService,
	});

	const requiredControls = requiredRawControls.map((ctrl) => ({
		...ctrl,
		value:
				formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name]
				|| ctrl.value,
	}));

	const defaultValues = getDefaultValues(requiredControls);

	const formProps = useForm({ defaultValues });

	const { control, formState: { errors } } = formProps || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Quotation Update and Reallocation</div>
			<div className={styles.service_provider}>
				<FormLayout
					fields={requiredControls}
					control={control}
					errors={errors}
				/>
			</div>
			{editQuote.serviceQuotationLoading ? (
				<div className={styles.loading_container}>
					Loading Task....
					<Loader themeType="primary" className={styles.loader_icon} />
				</div>
			) : (
				<Step3 data={editQuote} shipment_id={task?.shipment_id} />
			)}
		</div>
	);
}

export default EditRate;
