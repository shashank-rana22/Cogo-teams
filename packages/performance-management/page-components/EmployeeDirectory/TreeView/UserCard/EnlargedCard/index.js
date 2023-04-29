import { Tooltip, Pill, Button, Avatar } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import ReassignManager from '../../../../../common/ReassignManager';

import styles from './styles.module.css';

function EnlargedCard({ user = {}, avatarProps = {}, refetchTreeParams, loading = false }) {
	const [openReassign, setOpenReassign] = useState(false);

	const infoArr = [{
		id    : 'call',
		label : <IcMCall />,
		value : <div style={{ marginLeft: '8px' }}>{user.mobile_number || '---'}</div>,
	},
	{
		id    : 'email',
		label : <IcMEmail />,
		value : <div style={{ marginLeft: '8px' }}>{user.email || '---'}</div>
		,
	}];

	return (
		<div className={`${styles.enlarged_container} ${loading ? styles.enlarged_loading : ''}`}>
			<div className={styles.enlarged_card}>
				<div className={styles.status}>
					<Pill color="blue">{startCase(user.employment_status || '---')}</Pill>

					{!openReassign && (
						<Button
							size="sm"
							disabled={user.is_ceo}
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
							<strong>{startCase(user.name || '---')}</strong>

							<div className={styles.id_designation}>
								<Tooltip
									placement="bottom"
									content={(
										<div style={{ wordBreak: 'break-word' }}>
											{startCase(user.designation || '---')}
										</div>
									)}
								>
									<div className={styles.designation}>{startCase(user.designation || '---')}</div>
								</Tooltip>

								<div className={styles.id}>{user.cogo_id || '---'}</div>
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
				{!!user.team_count && <div className={styles.team_count}>{user.team_count}</div>}
			</div>

			<div className={`${styles.reassign_manager_container} ${openReassign ? styles.expand : ''}`}>
				<ReassignManager
					userId={user.user_id}
					refetchTreeParams={refetchTreeParams}
					setOpenReassign={setOpenReassign}
				/>
			</div>
		</div>
	);
}
export default EnlargedCard;
