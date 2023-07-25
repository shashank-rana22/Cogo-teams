import { Button, Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useState } from 'react';

import useGetTaskConfig from '../../../../../hooks/useGetTaskConfig';
import useSendBookingConfirmationEmail from '../../../../../hooks/useSendBookingConfirmationEmail';
import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

import getControls from './getControls';
import PreviewAndSubmit from './Preview';
import styles from './styles.module.css';

function ConfirmFreightBooking({
	task = {},
	onCancel = () => {},
	services = [],
	taskListRefetch = () => {},
}) {
	const [show, setShow] = useState(false);

	const desiredService = services.find((service) => service.service_type === 'fcl_freight_service') || {};

	const { control, formState: { errors }, handleSubmit, watch, getValues } = useForm();

	const formValues = watch();

	const { taskConfigData, loading: getTaskLoading } = useGetTaskConfig({
		task,
	});

	const { apiTrigger, loading, response } = useSendBookingConfirmationEmail({ });
	const { apiTrigger: updateTask } = useUpdateShipmentPendingTask({
		refetch: () => {
			onCancel();
			taskListRefetch();
		},
		successMessage: 'Request Submitted Successfully',
	});

	const { controls, showElements } = getControls({
		taskData: taskConfigData,
		formValues,
	});

	const sendConfirmationMail = ({ preview = false, mailData }) => {
		const payload = {
			pending_task_id   : task.id,
			recipient_id      : mailData?.agent_id || getValues()?.agent_id,
			show_preview_only : preview,
		};

		apiTrigger(payload)
			.then(() => {
				setShow(true);
				if (!payload?.show_preview_only) {
					onCancel();
					taskListRefetch();
				}
			})
			.catch((err) => {
				toastApiError(err);
			});
	};

	const handleSubmitClick = ({ preview, mailData }) => {
		handleSubmit(() => {
			sendConfirmationMail({ preview, mailData });
		})();
	};

	const loadPreview = (mailData) => {
		handleSubmitClick({ preview: true, mailData });
	};

	const onUpdate = () => {
		const payload = {
			id   : task?.id,
			data : {
				fcl_freight_service: {
					id                              : desiredService?.id,
					booking_reference_delay_reasons : formValues?.booking_reference_delay_reasons,
				},
			},
		};

		updateTask(payload);
	};

	if (getTaskLoading) {
		return <Loader />;
	}

	return (
		<>
			<Layout
				fields={controls}
				control={control}
				showElements={showElements}
				errors={errors}
				formValues={watch()}
				shipment_id={task?.shipment_id}
			/>

			<PreviewAndSubmit
				data={response}
				show={show}
				setShow={setShow}
				getTaskConfigApi={taskConfigData}
				handleUpdate={handleSubmitClick}
				onCancel={onCancel}
				loading={loading}
				buttonText="Submit"
			/>

			<div className={styles.button_container}>
				<Button themeType="secondary">
					Cancel
				</Button>

				<Button
					themeType="primary"
					onClick={formValues?.booking_ref_status === 'placed'
						? handleSubmit(loadPreview) : handleSubmit(onUpdate)}
					disabled={loading}
				>
					{formValues?.booking_ref_status === 'placed' ? 'Preview' : 'Submit'}
				</Button>
			</div>
		</>
	);
}
export default ConfirmFreightBooking;
