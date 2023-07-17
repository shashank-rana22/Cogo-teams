import { Tabs, TabPanel } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Image, useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const FILTER_TAB_OPTIONS = [
	{ label: 'Day', name: 'day' },
	{ label: 'Week', name: 'week' },
	{ label: 'Month', name: 'month' },
];

function Header({ timeline = '', setTimeline = () => {} }) {
	const { query, back } = useRouter();

	const { id: agentId = '' } = query || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{agentId && (
					<IcMArrowBack className={styles.back_icon} onClick={() => back()} />
				)}
				<div><Image src={GLOBAL_CONSTANTS.image_url.cogo_one_logo} alt="CogoOne" width={30} height={30} /></div>
				<div className={styles.heading_name}>ogoOne Dashboard</div>
			</div>

			<div className={styles.header_right_section}>
				<Tabs
					activeTab={timeline}
					themeType="tertiary"
					onChange={setTimeline}
					className={styles.tabs_style}
				>
					{FILTER_TAB_OPTIONS.map((item) => {
						const { label = '', name = '' } = item;
						return <TabPanel key={name} name={name} title={label} />;
					})}

				</Tabs>
			</div>
		</div>
	);
}
export default Header;
