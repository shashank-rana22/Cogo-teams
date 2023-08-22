import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall, IcMEmail, IcMTick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import styles from './styles.module.css';

const colorArr = ['#DCE1D8', '#FCE4BF', '#CFDAE8', '#DED7FC', '#E1DEEC'];

const FIRST_INDEX = 1;

const SECOND_INDEX = 2;

const getInitials = (name = '') => {
	if (!name) {
		return '';
	}

	const full_name = name.split(' ');
	const initials = full_name.map((char) => char.charAt(GLOBAL_CONSTANTS.zeroth_index).toUpperCase());
	return initials.length > SECOND_INDEX ? initials.splice(GLOBAL_CONSTANTS.zeroth_index, SECOND_INDEX) : initials;
};

function UserDetails({ user_data = {} }) {
	const { t } = useTranslation(['profile']);

	return (
		<>
			{user_data.block_access ? (
				<div className={styles.blocked_user_tag}>
					{
			t('profile:blocked_button')
}
				</div>
			) : null}

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

	const profileRef = useRef({
		backgroundColor: colorArr[Math.floor(Math.random()
		* (colorArr.length + FIRST_INDEX))],
	});

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
