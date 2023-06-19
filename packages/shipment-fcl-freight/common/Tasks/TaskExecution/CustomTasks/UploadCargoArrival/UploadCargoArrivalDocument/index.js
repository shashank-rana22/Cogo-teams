import { Button } from '@cogoport/components';
import { InputController, UploadController, useForm } from '@cogoport/forms';

import useCreateShipmentDocument from '../../../../../../hooks/useCreateShipmentDocument';
import useUpdateShipmentPendingTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

import styles from './styles.module.css';

function UploadCargoArrivalDocument({
	pendingTask = {},
	refetch = () => {},
	setShowDocument = () => {},
	showDocument = false,
	clearTask = () => {},
}) {
	const { control, formState:{ errors = {} }, handleSubmit } = useForm();

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}
	const cargoDocRefetch = () => {
		setShowDocument(false);
		refetch();
		clearTask();
	};
	const { apiTrigger, docLoading } = useCreateShipmentDocument({
		refetch: cargoDocRefetch,
	});

	const { apiTrigger: pendingTaskTrigger, loading: pendingTaskLoading } = useUpdateShipmentPendingTask({});

	const onSubmit = async (values) => {
		const data = {
			shipment_id        : pendingTask?.shipment_id,
			uploaded_by_org_id : pendingTask?.organization_id,
			document_type      : 'container_arrival_notice',
			service_id         : pendingTask?.service_id,
			service_type       : pendingTask?.service_type,
			task_id       		   : pendingTask?.id,
			documents          : [
				{
					file_name    : values?.cargo_arrival_notice?.fileName,
					document_url : values?.cargo_arrival_notice?.finalUrl,
					data         : {
						description: values?.document_description,
					},
				},
			],
		};
		const res = await apiTrigger(data);
		if (!res.hasError) {
			const payload = {
				id     : pendingTask?.id,
				status : 'comppleted',
			};
			await pendingTaskTrigger(payload);
		}
	};

	return (
		showDocument ? (
			<>
				<div className={styles.head}>Upload Cargo Arrival Notice Document</div>
				<div className={styles.layout}>

					<div className={styles.description}>
						<div className={styles.label}>Document description (Optional)</div>
						<InputController
							size="sm"
							control={control}
							name="document_description"
						/>
					</div>

					<div className={styles.upload_container}>
						<div className={styles.label}>Upload Document</div>
						<UploadController
							name="cargo_arrival_notice"
							control={control}
							rules={{
								required: 'Document is required',
							}}
						/>
						{Error('cargo_arrival_notice')}
					</div>
				</div>

				<div className={styles.footer}>
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={docLoading || pendingTaskLoading}
					>
						Submit
					</Button>
				</div>
			</>
		) : null
	);
}

export default UploadCargoArrivalDocument;
