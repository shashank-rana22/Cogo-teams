import { Tooltip, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMCall, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState, useContext } from 'react';

import styles from './styles.module.css';
import UnableToDoTask from './UnableToDoTask';
import UpdateAssignedStakeholder from './UpdateAssignedStakeholder';

function UpdateAction({ task = {}, hideThreeDots }) {
	const [showAction, setShowAction] = useState(false);
	const [showUnableTo, setShowUnableTo] = useState(false);
	const [showAdmin, setShowAdmin] = useState(false);

	const { servicesList: services } = useContext(ShipmentDetailContext);

	const isMainServiceCancelled = false;
	const requiredServiceArr = [];

	(task.task_field_ids || []).forEach((id) => {
		(services || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				requiredServiceArr.push(serviceObj);
			}
		});
	});

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
						<div style={{ fontSize: '10px' }}>
							{`${task?.stakeholder?.mobile_country_code}-${task?.stakeholder?.mobile_number}`}
						</div>
					)}
				>
					<div>
						<IcMCall
							style={{
								marginLeft : '20px',
								cursor     : 'pointer',
								width      : '18px',
								height     : '18px',
								color      : '#000000',
							}}
						/>
					</div>
				</Tooltip>
			) : (
				<div
					style={{
						marginLeft : '20px',
						cursor     : 'pointer',
						width      : '18px',
						height     : '18px',
						color      : '#000000',
					}}
				/>
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
					{!isMainServiceCancelled && !hideThreeDots ? (
						<IcMOverflowDot
							style={{
								marginLeft : '12px',
								width      : '20px',
								height     : '20px',
								color      : '#000000',
							}}
						/>
					) : (
						<div style={{ paddingRight: '40px' }} />
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
