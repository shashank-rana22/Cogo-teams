import { Tooltip, Popover } from '@cogoport/components';
import { IcMCall, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';
import UnableToDoTask from './UnableToDoTask';
import UpdateAssignedStakeholder from './UpdateAssignedStakeholder';

function UpdateAction({ task = {}, hideThreeDots }) {
	const [showAction, setShowAction] = useState(false);
	const [showUnableTo, setShowUnableTo] = useState(false);
	const [showAdmin, setShowAdmin] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.stakeholder_info}>
				{task?.status === 'completed'
					? startCase(task?.updated_by?.name)
					: startCase(task?.stakeholder?.name)}

				{task?.assigned_stakeholder === 'system' && startCase(task?.assigned_stakeholder)}
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

					</>
				)}
			>
				<div
					onClick={
						task?.status === 'pending' ? () => setShowAction(true) : null
					}
					className={styles.action}
				>
					{ !hideThreeDots ? (
						<IcMOverflowDot className={styles.overflow_icon} />
					) : (
						<div className={styles.overflow_div} />
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
