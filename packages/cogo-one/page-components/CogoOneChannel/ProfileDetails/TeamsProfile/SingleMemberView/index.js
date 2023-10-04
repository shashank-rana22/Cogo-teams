import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick, IcMTimer } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import { USER_CURRENT_STATUS_WITH_ICON_MAPPING } from '../../../../../constants/teamStatusMapping';
import { profileBasicDetailsMapping } from '../../../../../utils/getProfileBasicDetailsMapping';

import styles from './styles.module.css';

function SingleMemberView({
	groupMembersData = [],
	status = '',
	isDraft = false,
}) {
	console.log('isDraft', isDraft);
	const otherActiveMemberData = groupMembersData.find(
		(item) => !item?.is_admin || item.access_type === 'user',
	);
	const loginUserData = groupMembersData.find((item) => item.is_admin || item.access_type === 'owner');

	const { name = '', partner = {} } = otherActiveMemberData || {};
	const { name: userName = '', roles_data = [], department = '' } = partner || {};
	const { name: roleName = '' } = roles_data?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { name: adminName = '', partner : partnerData = '' } = loginUserData || {};
	const { name: loggedAdminName = '' } = partnerData || {};

	const statusIcon = USER_CURRENT_STATUS_WITH_ICON_MAPPING[status]?.icon || null;
	const userCurrentStatus = USER_CURRENT_STATUS_WITH_ICON_MAPPING[status]?.status || null;

	const PROFILE_BASIC_DETAILS_MAPPING = profileBasicDetailsMapping({ partner });

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

			<div className={styles.profile_title}>Profile</div>
			<div className={styles.user_profile_info}>
				<div className={styles.section_third_left_avtar}>
					<Avatar
						personName={name || userName}
						alt="name"
						size="48px"
						className={styles.styled_avatar}
					/>
					<IcCFtick className={styles.section_third_left_ic_tick_icon} />
				</div>
				<div>
					<div className={styles.profile_title}>{startCase(name || userName)}</div>
					<div className={styles.profile_key_details}>{roleName || '-'}</div>
					{department ? <div className={styles.profile_key_details}>{department}</div> : null}
				</div>
			</div>

			{userCurrentStatus ? (
				<div className={styles.user_profile_status}>
					<div className={styles.status_with_time_container}>
						<div className={styles.row_direction}>
							{statusIcon || null}
							<span className={styles.user_current_status}>{userCurrentStatus}</span>
						</div>
						<div className={styles.row_direction}>
							<div className={styles.dot_notation} />
							<div className={styles.user_until_free}>
								Free until
								{format(new Date(), GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}
							</div>
						</div>
					</div>
					<div className={styles.timezone}>
						<IcMTimer width={16} height={16} className={styles.timer_icon} />
						{format(new Date(), GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}
						-
						<span>Same time zone as you</span>
					</div>
				</div>
			) : null}

			{(PROFILE_BASIC_DETAILS_MAPPING || []).map((item) => {
				const { title = '', icon = '', subTitle = '', subTextColor = '' } = item || {};

				return (
					<div key={item?.name} className={styles.profile_basic_details_notes}>
						{icon}
						<div>
							<div className={styles.profile_basic_details_note_title}>{title}</div>
							<div
								className={styles.profile_basic_details_note_sub_title}
								style={{ color: subTextColor }}
							>
								{subTitle || '-'}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default SingleMemberView;
