import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';

import getDefaultValues from '../../utils/get-default-values';

import getControls from './helper/getControls';
import useGetStep3Data from './helper/useGetStep3Data';
import Step3 from './Step3';
import styles from './styles.module.css';

function EditRate({
	task = {},
	servicesList = [],
	onCancel = () => {},
	shipment_data = {},
	refetch = () => {},
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

	const defaultValues = getDefaultValues(requiredRawControls);

	const formProps = useForm({ defaultValues });

	const { control, formState: { errors } } = formProps || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Quotation Update and Reallocation</div>
			<div className={styles.service_provider}>
				<Layout
					fields={requiredRawControls}
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
