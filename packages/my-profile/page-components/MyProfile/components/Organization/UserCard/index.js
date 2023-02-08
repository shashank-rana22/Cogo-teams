import { Popover } from '@cogoport/components';
import { IcMCall, IcMEmail, IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

// const getColor = () => {
// 	const colorArr = ['#DCE1D8', '#FCE4BF', '#CFDAE8', '#DED7FC', '#E1DEEC'];

// 	const index = Math.floor(Math.random() * (colorArr?.length + 1));
// 	const color = colorArr[index];
// 	return color;
// };

function UserCard({
	user_data = {},
	type = '',
	// params = {},
	// setParams = () => {},
}) {
	const getInitials = (name = '') => {
		if (!name) {
			return '';
		}

		const full_name = name.split(' ');
		const initials = full_name.map((char) => char.charAt(0).toUpperCase());
		return initials.length > 2 ? initials.splice(0, 2) : initials;
	};

	// const handleClickOnUserCard = () => {
	// 	if (type !== 'active') {
	// 		setParams({ ...params, user_id: user_data?.id });
	// 	}
	// };

	const renderUserDetails = () => (
		<>
			{user_data.block_access ? <div className={styles.blocked_user_tag}>Blocked</div> : null}

			<div className={styles.popover_container}>
				<div className={styles.header_text}>{user_data?.name}</div>

				<div className={styles.value_text}>
					{user_data?.role?.name || '-'}
				</div>

				<div className={styles.flex_div}>
					<IcMEmail style={{ marginRight: 6 }} />
					<div className={styles.value_text}>{user_data?.email || '-'}</div>
				</div>

				<div className={styles.flex_div}>
					<IcMCall style={{ marginRight: 6 }} />
					<div className={styles.value_text}>
						{user_data?.mobile_number
							? `${user_data?.mobile_country_code} ${user_data?.mobile_number}`
							: '-'}
					</div>
				</div>
			</div>

		</>
	);

	return (
		<Popover
			placement="right"
			content={renderUserDetails()}
			trigger="mouseenter"
			theme="light"
			interactive
			animation="shift-away"
		>
			<div
				className={styles.card_container}
				// className={type}
				// onClick={handleClickOnUserCard}
				// isBlocked={user_data?.block_access ? true : null}
			>
				<div
					className={styles.container}
					// className={type}
					// eslint-disable-next-line react/no-unknown-property
					isBlocked={user_data?.block_access ? true : null}
					// eslint-disable-next-line react/no-unknown-property
					hasImage={user_data.picture}
				>
					{user_data.picture ? (
						<div className={styles.profile_image_container}>
							<div
								className={styles.profile_image}
								src={user_data.picture}
								alt={getInitials(user_data?.name)}
							/>
						</div>
					) : (
						<div
							className={styles.avatar}
							// className={type}
							// background={user_data?.block_access ? '#ffe3e3' : getColor()}
						>
							<div className={styles.avatar_text}>{getInitials(user_data?.name)}</div>
						</div>
					)}
				</div>

				{type === 'active' && (
					<div className={styles.icon_container}>
						<IcMTick size={0.8} />
					</div>
				)}

				<div className={styles.line_container}>
					<div className={styles.name_text}>{user_data?.name || '-'}</div>

					<div
						className={styles.division_line}
						// className={type}
						// isBlocked={user_data?.block_access ? true : null}
					/>

					<div className={styles.designation}>{user_data?.role?.name || '-'}</div>
				</div>
			</div>
		</Popover>
	);
}

export default UserCard;
