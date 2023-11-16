import { Button, Pill, Modal } from '@cogoport/components';
import {
	InputController,
	CheckboxController,
	useForm,
} from '@cogoport/forms';
import { IcMTaskCompleted, IcCFtick, IcMClock, IcMInformation } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useIgnorepApplicationProcess from '../../../hooks/useIgnoreApplicationProcess';

import styles from './styles.module.css';

function Heading({
	title = 'HR MEETING', subTitle = 'Summary from manager interaction',
	isComplete = false, name = '', isIgnored = false, application_process_details = [], refetch = () => {},
}) {
	const { name:hrName } = useSelector(({ profile }) => ({
		name: profile.user.name,
	}));
	const [show, setShow] = useState(false);

	const { control, formState:{ errors = {} }, handleSubmit } = useForm();

	const { ignoreApplication } = useIgnorepApplicationProcess({ refetch });

	const onSubmit = (values) => {
		const process_list = (application_process_details || []).map((item) => {
			if (values[item.process_name] === true) {
				return item?.process_detail_id;
			}
			return null;
		}).filter((id) => id !== null);
		const ignored_reason = values.reason;
		ignoreApplication({ process_list, ignored_reason, setShow });
	};

	if (isIgnored) {
		return (
			<>
				<div className={styles.header}>
					<div className={styles.left_header}>
						<span className={styles.upper_text}>{title}</span>
						<span className={styles.lower_text}>{subTitle}</span>
					</div>
					<div className={styles.logs_button}>
						<Pill size="xl" style={{ height: '32px' }} color="orange">Ignored</Pill>
					</div>
				</div>

				<div className={styles.sub_heading}>
					<IcCFtick width={20} height={20} />
					<span style={{ marginLeft: '10px' }}>
						The process has been ignored by
						{' '}
						{hrName}
						.
					</span>
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<span className={styles.upper_text}>{title}</span>
					<span className={styles.lower_text}>{subTitle}</span>
				</div>
				<div className={styles.logs_button}>
					{isComplete ? <Pill size="xl" style={{ height: '32px' }} color="green">Completed</Pill>
						: <Pill size="xl" style={{ height: '32px' }} color="orange">Pending</Pill>}
					{!isComplete ?	(
						<Button size="md" themeType="accent" onClick={() => setShow(true)}>
							<IcMTaskCompleted />
							<span style={{ marginLeft: '4px' }}>Skip Certain Tasks</span>
						</Button>
					) : null}
				</div>
			</div>

			<div className={styles.sub_heading}>
				{isComplete ? <IcCFtick width={20} height={20} />
					: <IcMClock width={20} height={20} style={{ color: '#F68B21' }} />}
				<span style={{ marginLeft: '10px' }}>
					{isComplete ? `Cleared by ${name || '-'}.`
						: `Awaiting clearance from ${name || '-'}.`}
				</span>
			</div>

			{show && (
				<Modal size="md" show={show} onClose={() => setShow(false)} placement="right">
					<Modal.Header title="Skip Certain Tasks" />
					<Modal.Body>
						<div className={styles.prompt}>
							<IcMInformation style={{ color: '#EE3425' }} width={20} height={20} />
							<span className={styles.prompt_text}>
								Tasks once skipped can not be undone
							</span>
						</div>
						<div style={{ marginBottom: '4px' }}>Enter reason for skipping</div>
						<InputController
							control={control}
							name="reason"
							isClearable
							rules={{ required: 'this is required' }}
						/>
						{errors.reason && (
							<span className={styles.error}>*This field is Required</span>
						)}
						{(application_process_details || []).map((item) => (
							<div className={styles.checkbox} key={item.id}>
								<CheckboxController
									control={control}
									name={item.process_name}
									isClearable
									disabled={item.is_complete || item.is_complete === null}
								/>
								<div>{startCase(item.process_name)}</div>
							</div>
						))}

					</Modal.Body>
					<Modal.Footer>
						<Button onClick={handleSubmit(onSubmit)}>OK</Button>
					</Modal.Footer>
				</Modal>
			)}

		</>
	);
}

export default Heading;
