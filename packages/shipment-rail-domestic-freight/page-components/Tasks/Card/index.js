import { Button, Modal } from '@cogoport/components';
import { InputController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';

import useSendRailIndentEMail from '../../../hooks/useSendRailIndentMail';
import getMailControls from '../../../utils/getMailControls';

import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';

function Card({
	task = {},
	handleClick = () => {},
	selectedTaskId = '',
	isTaskOpen = false,
	refetch = () => {},
	show = false,
	setShow = () => {},
}) {
	const handleChange = (newMails) => {
		handleClick(task, newMails);
	};
	const { query } = useRouter();
	const { loading, sendRailIndentEmail } = useSendRailIndentEMail();
	const controls = getMailControls();
	const { control, formState:{ errors }, handleSubmit } = useForm({
		defaultValues: {
			mail_from : task?.stakeholder?.email,
			mail_to   : '',
		},
	});

	const onSubmit = async (formValues) => {
		const PAYLOAD = {
			show_preview_only : true,
			shipment_id       : query?.shipment_id,
			email_details     : {
				from_email : formValues.mail_from,
				to_email   : formValues.mail_to,
			},
		};
		await sendRailIndentEmail({ payload: PAYLOAD });
		setShow((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			<TaskDetails task={task} isTaskOpen={isTaskOpen} />

			<div className={styles.action}>
				{isTaskOpen ? (
					null
				) : (
					<UpdateButton
						task={task}
						handleClick={handleClick}
						handleChange={handleChange}
						hideButton={task.status === 'completed' || selectedTaskId.length}
					/>
				)}

				<UpdateAction
					task={task}
					hideThreeDots={task.status === 'completed'}
					refetch={refetch}
				/>
			</div>
			{
	task.task === 'upload_indent' ? (
		<Modal show={show} onClose={() => setShow(false)}>
			<Modal.Header title="EMAIL FORM" />
			<Modal.Body>
				<div className={styles.flex}>
					{
					(controls || []).map((fieldControls) => (
						<div key={fieldControls.name} className={styles.field}>
							<div className={styles.label}>{fieldControls.label}</div>
							<InputController
								control={control}
								{...fieldControls}
							/>
							{!isEmpty(errors) ? (
								<div className={styles.error}>
									{errors[fieldControls.name]?.message}
								</div>
							) : null}
						</div>
					))
		}
				</div>
				<div className={styles.footer}>
					<Button
						onClick={() => setShow(false)}
						themeType="secondary"
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						themeType="accent"
						type="submit"
						disabled={loading}
						loading={loading}
					>
						Show Preview
					</Button>
				</div>

			</Modal.Body>
		</Modal>
	) : null
}

		</div>
	);
}

export default Card;
