import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMRaiseTicket, IcMEmail } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import { HEADER_NAV } from '../../../utils/constants';

import styles from './styles.module.css';

function greetings() {
	const myDate = new Date();
	const hours = myDate.getHours();
	let greet;

	if (hours < 12) greet = 'morning';
	else if (hours >= 12 && hours <= 17) greet = 'afternoon';
	else if (hours >= 17 && hours <= 24) greet = 'evening';

	return greet;
}

function Header() {
	const router = useRouter();

	// const { user_role } = summaryData || {};

	const profileData = useSelector(({ profile }) => profile);
	const userName = profileData?.user.name;

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.header_title}>
					COGO HR
				</div>
				<div className={styles.header_right_flex}>
					{/* <Button themeType="secondary">
						<span className={styles.header_right_flex}>
							New Request
							<IcMPlus width={12} height={12} style={{ marginLeft: 4 }} />
						</span>
					</Button> */}
					<Button themeType="secondary" onClick={() => router.push('/ticket-management/my-tickets')}>
						<span className={styles.header_right_flex}>
							My Tickets
							<IcMRaiseTicket width={14} height={14} style={{ marginLeft: 4 }} />
						</span>
					</Button>
					<Button style={{ marginLeft: 12 }}>
						<span className={styles.header_right_flex}>
							My Inbox
							<IcMEmail width={14} height={14} style={{ marginLeft: 4 }} />
						</span>
					</Button>
				</div>
			</div>
			<div className={styles.header_data_flex}>
				<div className={styles.user_left_flex}>
					<div className={styles.name_avatar}>
						HK
					</div>
					<div className={styles.greetings}>
						<div className={styles.user_name_text}>
							Good
							{' '}
							{greetings()}
							{' '}
							{' '}
							{userName}
							!
						</div>
						<div className={styles.date_text}>
							{formatDate({
								date       : new Date(),
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>
					</div>
				</div>
				<div className={styles.header_data_right_flex}>
					{HEADER_NAV.map((val) => {
						const ICON = val.icon;

						return (
							<Button key={val.label} className={styles.mr_12} onClick={() => router.push(val.route)}>
								<ICON width={14} height={14} style={{ marginRight: 4 }} />
								{val.label}
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Header;
