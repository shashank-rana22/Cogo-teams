import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const MAX_GROUP_MEMBER = 2;

function GroupMemberView({ groupMembersData = {} }) {
	const loginUserData = groupMembersData.find((item) => item.is_admin || item.access_type === 'owner');
	const { name: adminName = '', partner : partnerData = '' } = loginUserData || {};
	const { name: loggedAdminName = '' } = partnerData || {};

	const totalGroupMembers = groupMembersData?.length;

	return (
		<div>
			<div className={styles.section_one}>
				<Avatar
					personName={adminName || loggedAdminName}
					alt="name"
					size="38px"
					className={styles.styled_avatar}
				/>
				<IcCFtick className={styles.ic_tick_icon} />
			</div>

			{totalGroupMembers > MAX_GROUP_MEMBER ? (
				<div className={styles.group_title}>
					Group Members (
					{totalGroupMembers}
					)
				</div>
			) : null}
			{(groupMembersData || []).map((item) => {
				const { name = '', is_admin = false, partner = {}, access_type = '' } = item || {};
				const { name: userName = '', roles_data = [] } = partner || {};
				const { name: roleName = '' } = roles_data?.[GLOBAL_CONSTANTS.zeroth_index] || {};

				return (
					<div key={name} className={styles.row_direction}>
						<Avatar
							personName={name || userName}
							alt="name"
							size="40px"
							className={styles.styled_avatar}
						/>
						<div>
							<div className={styles.group_member_name}>
								{name || userName || '-'}
								{is_admin || access_type === 'owner' ? <span>(Admin)</span> : false}
							</div>
							<div className={styles.group_member_designation}>{roleName || '-'}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default GroupMemberView;
