import { Popover, cl } from '@cogoport/components';
import { IcCTick, IcMEmail, IcMCall } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function UserCard({
	user_data = {},
	type = '',
	params = {},
	setParams = () => {},
}) {
	const getInitials = (name = '') => {
		if (!name) {
			return '';
		}

		const full_name = name.split(' ');
		const initials = full_name.map((char) => char.charAt(0).toUpperCase());
		return initials.length > 2 ? initials.splice(0, 2) : initials;
	};

	const handleClickOnUserCard = () => {
		if (type !== 'active') {
			setParams({ ...params, user_id: user_data?.user_id });
		}
	};

	function RenderUserDetails() {
		return (
			<div className={styles.popover_container}>
				<div className={styles.header_text}>{user_data?.name}</div>

				<div className={cl`${styles.value_text} ${styles.role_name}`}>
					{user_data?.designation || '-'}
				</div>

				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMEmail style={{ marginRight: 6 }} />
					<div className={styles.value_text}>{user_data?.email || user_data?.cogoport_email || '-'}</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMCall style={{ marginRight: 6 }} />
					<div className={styles.value_text}>
						{user_data?.mobile_number
							? `${user_data?.mobile_country_code} ${user_data?.mobile_number}`
							: '-'}
					</div>
				</div>
			</div>
		);
	}

	return (
		<Popover
			placement="right"
			content={<RenderUserDetails />}
			trigger="mouseenter"
			theme="light"
			interactive
			animation="shift-away"
		>
			<div
				className={cl`${styles.card_container} ${styles[type]}`}
				onClick={handleClickOnUserCard}
				aria-hidden
			>
				<div
					className={cl`${styles.container} ${styles[type]}`}
				>
					{user_data.passport_size_photo_url ? (
						<div className={styles.profile_image_container}>
							<img
								className={styles.profile_image}
								src={user_data.passport_size_photo_url}
								alt={getInitials(user_data?.name)}
							/>
						</div>
					) : (
						<div
							className={`${styles.avatar} ${styles[type]}`}
						>
							<div className={styles.avatar_text}>{getInitials(user_data?.name)}</div>
						</div>
					)}
				</div>

				{type === 'active' && (
					<div className={styles.icon_container}>
						<IcCTick width={14} height={14} />
					</div>
				)}

				<div className={styles.line_container}>
					<div className={styles.name_text}>{user_data?.name || '-'}</div>
					<div className={cl`${styles.division_line} ${styles[type]}`} />
					<div className={styles.designation}>{user_data?.designation || '-'}</div>
				</div>
			</div>
		</Popover>
	);
}

export default UserCard;
