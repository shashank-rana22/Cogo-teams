import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';

import useUpdateShipmentService from '../../../../../hooks/useUpdateShipmentService';
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
		servicesList,
		shipment_data,
		onCancel,
		task,
		taskListRefetch: refetch,
		formattedRate,
	});

	const { apiTrigger } = useUpdateShipmentService({});

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
				formattedRate?.[task?.service_id]?.[ctrl.name]
				|| ctrl.value,
	}));

	const defaultValues = getDefaultValues(requiredControls);

	const formProps = useForm({ defaultValues });

	const { control, formState: { errors }, handleSubmit } = formProps || {};

	const updateServiceFunc = async () => {
		let formData = {};

		await handleSubmit(
			(val) => {
				formData = val;
			},
		)();

		const service = servicesList.find((serviceObj) => serviceObj.id === task?.service_id);

		const payloadForUpdateShipment = {
			data                : { ...(formData || {}) },
			ids                 : [service?.id],
			service_type        : task?.service_type,
			shipment_id         : task?.shipment_id,
			performed_by_org_id : task?.organization_id,
		};

		await apiTrigger(payloadForUpdateShipment);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Quotation Update and Reallocation</div>
			<div className={styles.service_provider}>
				<Layout
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
				<Step3 data={editQuote} shipment_id={task?.shipment_id} updateServiceFunc={updateServiceFunc} />
			)}
		</div>
	);
}

export default EditRate;
