import { Tooltip, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMCall, IcMOverflowDot } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useContext } from 'react';

import styles from './styles.module.css';
import UnableToDoTask from './UnableToDoTask';
import UpdateAssignedStakeholder from './UpdateAssignedStakeholder';

const CAN_REASSIGN_TASK_STAKEHOLDER = ['superadmin', 'admin', 'prod_process_owner', 'tech_super_admin'];

function UpdateAction({ task = {}, hideThreeDots = false }) {
	const [showAction, setShowAction] = useState(false);
	const [showUnableTo, setShowUnableTo] = useState(false);
	const [showAdmin, setShowAdmin] = useState(false);

	const { servicesList: services, activeStakeholder } = useContext(ShipmentDetailContext);

	const REQUIRED_SERVICE_ARR = [];

	(task.task_field_ids || []).forEach((id) => {
		(services || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				REQUIRED_SERVICE_ARR.push(serviceObj);
			}
		});
	});

	const otherStakeholders = (task?.other_stakeholders || []).filter((item) => item.id !== task?.stakeholder?.id);
	const renderTooltip = otherStakeholders.map(
		(stakeholder) => <div key={stakeholder?.id}>{stakeholder?.name}</div>,
	);

	const canReassignTask = CAN_REASSIGN_TASK_STAKEHOLDER.includes(activeStakeholder);

	return (
		<div className={styles.container}>
			<div className={styles.stakeholder_info}>
				{task?.status === 'completed'
					? startCase(task?.updated_by?.name)
					: startCase(task?.stakeholder?.name)}

				{task?.assigned_stakeholder === 'system' && startCase(task?.assigned_stakeholder)}

				{task?.status === 'pending' && !isEmpty(otherStakeholders) ? (
					<div className={styles.other_stakeholders}>
						<Tooltip
							interactive
							theme="light"
							content={renderTooltip}
						>
							{' '}
							+
							{otherStakeholders.length}
						</Tooltip>
					</div>
				) : null }
			</div>

			{task?.stakeholder?.mobile_number ? (
				<Tooltip
					interactive
					theme="light"
					content={(
						<div className={styles.mobile_number}>
							{`${task?.stakeholder?.mobile_country_code}-${task?.stakeholder?.mobile_number}`}
						</div>
					)}
				>
					<IcMCall className={styles.call_icon} />
				</Tooltip>
			) : (
				<div className={styles.call_icon} />
			)}

			<Popover
				show={showAction}
				visible={showAction}
				arrow={false}
				interactive
				theme="light"
				onClickOutside={() => setShowAction(false)}
				content={(
					<>
						<div
							className={styles.task_action}
							onClick={() => {
								setShowAction(false);
								setShowUnableTo(true);
							}}
							role="button"
							tabIndex={0}
						>
							Unable to do Task
						</div>

						{canReassignTask ? (
							<div
								className={styles.task_action}
								onClick={() => {
									setShowAction(false);
									setShowAdmin(true);
								}}
								role="button"
								tabIndex={0}
							>
								Change Owner
							</div>
						) : null}
					</>
				)}
			>
				<div
					onClick={
						task?.status === 'pending' ? () => setShowAction(true) : null
					}
					className={styles.action}
				>
					{ hideThreeDots ? (
						<div className={styles.overflow_div} />
					) : (
						<IcMOverflowDot className={styles.overflow_icon} />
					)}
				</div>
			</Popover>

			<UnableToDoTask
				setShowUnableTo={setShowUnableTo}
				showUnableTo={showUnableTo}
				task={task}
			/>

			<UpdateAssignedStakeholder
				setShowAdmin={setShowAdmin}
				showAdmin={showAdmin}
				task={task}
			/>
		</div>
	);
}
export default UpdateAction;
