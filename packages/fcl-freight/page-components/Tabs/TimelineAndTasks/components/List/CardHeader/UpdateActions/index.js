import React, { useState } from 'react';
import { Popover, ToolTip } from '@cogoport/front/components/admin';
import { startCase } from '@cogoport/front/utils';
import { IcMCall, IcMOverflowDot } from '@cogoport/icons-react';
import styles from './styles.module.css';

const UpdateActions = ({
	task = {},
	services = [],
	setShowUnableTo = false,
	setShowAdmin = false,
	isMainServiceCancelled,
}) => {
	const [showAction, setShowAction] = useState(false);

	const requiredServiceArr = [];
	(task.task_field_ids || []).forEach((id) => {
		(services || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				requiredServiceArr.push(serviceObj);
			}
		});
	});

	return (
		<div className={styles.updated_by}>
			<div className={styles.stakeholder_info}>
				<div style={{ marginRight: '4px' }}>
					{task?.status === 'completed'
						? task?.updated_by?.name
						: task?.stakeholder?.name}
				</div>
				<div>
					{' '}
					{task?.shipment_type === 'air_freight'
						? `(${startCase(task?.assigned_stakeholder)})`
						: null}
				</div>
			</div>

			{task?.stakeholder?.mobile_number ? (
				<ToolTip
					interactive
					theme="light"
					content={
						<div style={{ fontSize: '10px' }}>
							{`${task?.stakeholder?.mobile_country_code}-${task?.stakeholder?.mobile_number}`}
						</div>
					}
				>
					<div>
						<IcMCall
							style={{
								marginLeft: '20px',
								cursor: 'pointer',
								width: '18px',
								height: '18px',
								color: '#393F70',
							}}
						/>
					</div>
				</ToolTip>
			) : null}
			<Popover
				show={showAction}
				visible={showAction}
				arrow={false}
				interactive
				theme="light"
				onClickOutside={() => setShowAction(false)}
				content={
					<>
						<div className={styles.task_action}
							onClick={() => {
								setShowAction(false);
								setShowUnableTo(true);
							}}
						>
							Unable to do Task
						</div>

						<div className={task.line} />

						<div className={styles.task_action}
							onClick={() => {
								setShowAction(false);
								setShowAdmin(true);
							}}
						>
							Change Owner
						</div>
					</>
				}
			>
				<div className={styles.action}
					onClick={
						task?.status === 'pending' ? () => setShowAction(true) : null
					}
					className={task?.status}
				>
					{!isMainServiceCancelled ? (
						<IcMOverflowDot
							style={{
								marginLeft: '20px',
								width: '20px',
								height: '20px',
								color: '#393F70',
							}}
						/>
					) : (
						<div className={styles.in_line} />
					)}
				</div>
			</Popover>
		</div>
	);
};

export default UpdateActions;
