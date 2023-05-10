import { Button, Loader } from '@cogoport/components';
import { InputController, SelectController, TextAreaController, useForm } from '@cogoport/forms';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import React, { useState } from 'react';

import useGetTaskConfig from '../../../../../hooks/useGetTaskConfig';
import useSendNominationNotification from '../../../../../hooks/useSendNominationNotification';

import getControls from './helpers/getControls';
import PreviewAndSubmit from './Preview';
import styles from './styles.module.css';

function NominationTask({
	task = {},
	onCancel = () => {},
	primaryService,
	refetch = () => {},
	shipmentData = {},
}) {
	const [show, setShow] = useState(false);

	const { taskConfigData, loading: getTaskLoading } = useGetTaskConfig({
		task,
	});

	const controls = getControls({
		task,
		taskData: taskConfigData,
		primaryService,
		shipmentData,
	});

	const subject = `Nomination//SID:${shipmentData.serial_id}//${primaryService?.origin_port?.display_name}-
					${primaryService?.destination_port?.display_name}//${primaryService?.cargo_weight_per_container}`;

	const { apiTrigger, loading, data } = useSendNominationNotification({ });

	const { control, formState: { errors }, handleSubmit, getValues } = useForm();

	const controlTypeMapping = {
		select   : SelectController,
		text     : InputController,
		number   : InputController,
		textarea : TextAreaController,
	};

	function FormElement({ name, label, type, span, ...rest }) {
		const Element = controlTypeMapping[type];

		const widthVal = (span / 12) * 100;
		return Element ? (
			<div style={{ width: `${widthVal}%` }}>
				<div className={styles.label}>{label}</div>
				<Element name={name} type={type} {...rest} />
				{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
			</div>
		) : null;
	}

	const sendNominationDetails = ({ preview = false, mailData }) => {
		const payload = {
			pending_task_id   : task.id,
			notification_type : 'email',
			recepient_id      : mailData?.agent_id || getValues()?.agent_id,
			show_preview_only : preview,
			email_details     : {
				email_body       : mailData?.email_body || getValues()?.email_body,
				shipment_details : mailData || getValues(),
			},
		};

		apiTrigger(payload)
			.then(() => {
				setShow(true);
				if (!payload?.show_preview_only) {
					onCancel();
					refetch();
				}
			})
			.catch((err) => {
				toastApiError(err);
			});
	};

	const handleSubmitClick = ({ preview, mailData }) => {
		handleSubmit(() => {
			sendNominationDetails({ preview, mailData });
		})();
	};

	const loadPreview = (mailData) => {
		handleSubmitClick({ preview: true, mailData });
	};

	if (getTaskLoading) {
		return <Loader />;
	}

	return (
		<div>
			<PreviewAndSubmit
				data={data}
				show={show}
				setShow={setShow}
				getTaskConfigApi={taskConfigData}
				handleUpdate={handleSubmitClick}
				onCancel={onCancel}
				loading={loading}
			/>
			<div className={styles.subject}> Subject</div>
			{subject}

			<div className={styles.form_container}>
				{controls.map((item) => <FormElement control={control} errors={errors} {...item} />)}
			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={onCancel} disabled={loading}>
					Cancel
				</Button>

				<Button onClick={handleSubmit(loadPreview)} disabled={loading}>
					Preview
				</Button>
			</div>
		</div>
	);
}

export default NominationTask;
