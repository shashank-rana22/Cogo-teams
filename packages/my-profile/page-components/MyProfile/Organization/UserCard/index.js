import { Popover } from '@cogoport/components';
import { IcMCall, IcMEmail, IcMTick } from '@cogoport/icons-react';
import { useRef } from 'react';

import styles from './styles.module.css';

const colorArr = ['#DCE1D8', '#FCE4BF', '#CFDAE8', '#DED7FC', '#E1DEEC'];

const getInitials = (name = '') => {
	if (!name) {
		return '';
	}

	const full_name = name.split(' ');
	const initials = full_name.map((char) => char.charAt(0).toUpperCase());
	return initials.length > 2 ? initials.splice(0, 2) : initials;
};

function UserDetails({ user_data }) {
	return (
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
}

function UserCard({
	user_data = {},
	type = '',
	params = {},
	setParams = () => {},
}) {
	const handleClickOnUserCard = () => {
		if (type !== 'active') {
			setParams({ ...params, user_id: user_data?.id });
		}
	};

	const profileRef = useRef({ backgroundColor: colorArr[Math.floor(Math.random() * (colorArr.length + 1))] });

	return (
		<div className={styles.main_container}>
			<Popover
				placement="right"
				content={<UserDetails user_data={user_data} />}
				trigger="mouseenter"
				theme="light"
				interactive
				animation="shift-away"
			>
				<div
					className={styles.card_container}
					id={type}
					role="presentation"
					onClick={handleClickOnUserCard}
				// eslint-disable-next-line react/no-unknown-property
					isBlocked={user_data?.block_access ? true : null}
				>
					<div
						className={styles.container}
					// eslint-disable-next-line react/no-unknown-property
						isBlocked={user_data?.block_access ? true : null}
					// eslint-disable-next-line react/no-unknown-property
						hasImage={user_data.picture}
					>

						<div
							className={styles.avatar}
							style={{
								background: `${user_data?.block_access ? '#ffe3e3'
									: profileRef?.current?.backgroundColor}`,
							}}
						>
							<div className={styles.avatar_text}>{getInitials(user_data?.name)}</div>
						</div>

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
						// eslint-disable-next-line react/no-unknown-property
							isBlocked={user_data?.block_access ? true : null}
						/>

						<div className={styles.designation}>{user_data?.role?.name || '-'}</div>
					</div>
				</div>
			</Popover>
		</div>
	);
}

export default UserCard;
