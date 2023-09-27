import { Button } from '@cogoport/components';
import { IcMPlus, IcMEmail } from '@cogoport/icons-react';
import React from 'react';

import { HEADER_NAV } from '../../../utils/constants';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.header_title}>
					COGO HR
				</div>
				<div className={styles.header_right_flex}>
					<Button themeType="secondary">
						<span className={styles.header_right_flex}>
							New Request
							<IcMPlus width={12} height={12} style={{ marginLeft: 4 }} />
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
						RD
					</div>
					<div className={styles.greetings}>
						<div className={styles.user_name_text}>
							Good morning Raghu!
						</div>
						<div className={styles.date_text}>
							Monday, 23 May 2023
						</div>
					</div>
				</div>
				<div className={styles.header_data_right_flex}>
					{HEADER_NAV.map((val) => {
						const ICON = val.icon;
						return (
							<Button key={val.label} className={styles.mr_12}>
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
