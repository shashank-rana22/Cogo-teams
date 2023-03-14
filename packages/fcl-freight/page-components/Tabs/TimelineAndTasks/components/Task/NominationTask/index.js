import React, { useState } from 'react';
import { Button, toast } from '@cogoport/front/components/admin';
import { useFormCogo } from '@cogoport/front/hooks';
import Layout from '../../../../commons/Layout';
import useGetTask from '../../../hooks/useGetTask';
import useNominationTask from './hooks/useNominationTask';
import PreviewAndSubmit from './Preview';
import { Container, ButtonWrap, Subject } from './styles';

const NominationTask = ({
	task = {},
	onCancel = () => {},
	Loader,
	shipment_data,
	refetch = () => {},
	shipment_overall_data = {},
}) => {
	const [show, setShow] = useState(false);
	const { getTaskConfigApi, loading: getTaskLoading } = useGetTask({
		task,
		onCancel,
	});
	const { controls, updateData, error, onError, subject, data, loading } =
		useNominationTask({
			task,
			getTaskConfigApi,
			api: '/send_nomination_notification',
			shipment_data,
			onCancel,
			refetch,
			shipment_overall_data,
		});

	const { fields, watch, handleSubmit } = useFormCogo(controls);
	const formValues = watch();

	const mailData = {
		shipper_detail: formValues.shipper_details,
		consignee_detail: formValues.consignee_details,
		commodity: formValues.commodity,
		cargo_weight: +formValues.cargo_weight,
		free_days_detention_destination:
			+formValues.free_days_detention_destination,
		hs_code: formValues.hs_code,
	};
	const sendNominationDetails = ({ preview = false }) => {
		const payload = {
			pending_task_id: task.id,
			notification_type: 'email',
			recepient_id: formValues.agent_id,
			show_preview_only: preview,
			email_details: {
				email_body: formValues.email_body,
				shipment_details: mailData,
			},
		};

		updateData(payload)
			.then(() => {
				setShow(!show);
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	const handleSubmitClick = ({ preview }) => {
		handleSubmit(() => {
			sendNominationDetails({ preview });
		}, onError)();
	};

	const loadPreview = () => {
		handleSubmitClick({ preview: true });
	};

	if (getTaskLoading) {
		return Loader;
	}

	return (
		<Container>
			<PreviewAndSubmit
				data={data}
				show={show}
				setShow={setShow}
				getTaskConfigApi={getTaskConfigApi}
				handleUpdate={handleSubmitClick}
				onCancel={onCancel}
				loading={loading}
			/>
			<Subject> Subject</Subject>
			{subject}
			<Layout fields={fields} controls={controls} errors={error} />
			<ButtonWrap>
				<Button className="secondary md" onClick={onCancel} disabled={loading}>
					cancel
				</Button>

				<Button onClick={loadPreview} disabled={loading}>
					Preview
				</Button>
			</ButtonWrap>
		</Container>
	);
};

export default NominationTask;
