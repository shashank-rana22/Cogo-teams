import { Modal, Pill, Button, Avatar } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import ReassignManager from './ReassignManager';
import styles from './styles.module.css';

function EnlargedCard({ user = {}, avatarProps = {} }) {
	const [openReassign, setOpenReassign] = useState(false);

	const infoArr = [{
		id    : 'call',
		label : <IcMCall />,
		value : <div style={{ marginLeft: '8px' }}>{startCase(user?.mobile_number) || '---'}</div>,
	},
	{
		id    : 'email',
		label : <IcMEmail />,
		value : <div style={{ marginLeft: '8px' }}>{startCase(user?.email) || '---'}</div>
		,
	},
	{
		id    : 'kpi',
		label : 'Current KPI : ',
		value : <span style={{ marginLeft: '8px' }}>{startCase(user?.current_kpi) || '---'}</span>,
	}];

	return (
		<div className={`${styles.enlarged_container} ${openReassign ? styles.expand : ''}`}>
			<div className={styles.enlarged_card}>
				<div className={styles.status}>
					<Pill color="blue">In Probation</Pill>

					{!openReassign && (
						<Button
							size="sm"
							disabled={user.id === user.manager_id}
							onClick={() => setOpenReassign(true)}
						>
							Reassign
						</Button>
					)}

				</div>

				<div className={styles.enlarged_name_card}>
					<div className={styles.name_card}>
						<Avatar {...avatarProps} size="80px" />
						<div className={styles.user_info} style={{ fontSize: '18px' }}>
							<div>{startCase(user?.name)}</div>
							<div>
								{startCase(user?.designation)}
								{' '}
								-
								{' '}
								{user?.employee_id}
							</div>
						</div>
					</div>

					{infoArr.map((info) => (
						<div className={styles.enlarged_user_info} key={info.id}>
							{info.label}
							{info.value}
						</div>
					))}

				</div>
			</div>

			<div className={`${styles.reassign_manager_container} ${openReassign ? styles.expand : ''}`}>
				<ReassignManager userId={user.id} setOpenReassign={setOpenReassign} />
			</div>
		</div>
	);
}
export default EnlargedCard;
