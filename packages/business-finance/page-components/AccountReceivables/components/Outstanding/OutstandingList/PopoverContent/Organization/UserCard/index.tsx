import { Popover } from '@cogoport/components';
import { IcCTick, IcMCall, IcMEmail } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

interface UserDataItems {
	block_access?:string,
	name?:string,
	role?: { name?:string },
	email?:string,
	mobile_number?:string,
	mobile_country_code?:string,
	picture?:string,

}
interface Props {
	userData?: UserDataItems;
	type?: string;
}

const getColor = () => {
	const colorArr = ['#DCE1D8', '#FCE4BF', '#CFDAE8', '#DED7FC', '#E1DEEC'];
	const index = Math.floor(Math.random() * (+(colorArr?.length || 0) + 1));
	const color = colorArr[index];
	return color;
};

function UserCard({ userData = {}, type = '' }:Props) {
	const getInitials = (name = '') => {
		if (!name) {
			return '';
		}

		const fullName = name.split(' ');
		const initials = fullName.map((char) => char.charAt(0).toUpperCase());
		return initials.length > 2 ? initials.splice(0, 2) : initials;
	};

	const renderUserDetails = () => (
		<>
			{userData?.block_access ? <div className={styles.blocked_user_tag}>Blocked</div> : null}

			<div className={styles.popover_container}>
				<div className={styles.header_text}>{userData?.name}</div>

				<div className={styles.value_text}>
					{userData?.role?.name || '-'}
				</div>

				<div className={styles.flex}>
					<IcMEmail style={{ marginRight: 6 }} />
					<div className={styles.value_text}>{userData?.email || '-'}</div>
				</div>

				<div className={styles.flex}>
					<IcMCall style={{ marginRight: 6 }} />
					<div className={styles.value_text}>
						{userData?.mobile_number
							? `${userData?.mobile_country_code} ${userData?.mobile_number}`
							: '-'}
					</div>
				</div>
			</div>
		</>
	);

	let activeColor = 'transparent';
	if (type === 'active') {
		activeColor = '#bdaff9';
	}
	if (type === 'active' && userData?.block_access) {
		activeColor = '#ef9b9b';
	}

	return (
		<Popover
			placement="right"
			render={renderUserDetails()}
			trigger="mouseenter"
		>

			<div
				className={userData?.block_access ? styles.card_container_isblock : styles.card_container}
				style={{ '--active-color': activeColor } as React.CSSProperties}

			>
				<div
					className={userData?.block_access ? styles.container_isblock : styles.container}
				>
					{userData?.picture ? (
						<div className={styles.profile_image_container}>
							<img
								className={styles.profile_image}
								src={userData.picture}
								alt={getInitials(userData?.name)?.[0]}
							/>
						</div>
					) : (
						<div
							className={`${styles.avatar} ${userData?.block_access ? '#ffe3e3' : getColor()}`}
							style={{ background: userData?.block_access ? '#ffe3e3' : getColor() }}

						>
							<div className={styles.avatar_text}>{getInitials(userData?.name)}</div>
						</div>
					)}
				</div>

				{type === 'active' && (
					<div className={styles.icon_container}>
						<IcCTick />
					</div>
				)}

				<div className={styles.line_container}>
					<div className={styles.name_text}>{userData?.name || '-'}</div>

					<div
						className={userData?.block_access ? styles.division_line_isblock : styles.division_line}
					/>

					<div className={styles.designation}>{userData?.role?.name || '-'}</div>
				</div>
			</div>
		</Popover>
	);
}

export default UserCard;
