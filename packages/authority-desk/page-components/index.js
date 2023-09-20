import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState, useCallback } from 'react';

import { useStakeholderCheck } from '../hooks/useStakeholderCheck';

import Ocean from './Ocean';
import GoToKamDesk from './Ocean/GoToKamDesk';
import styles from './styles.module.css';

const ROLE_NAME = {
	kam            : 'KAM',
	so2            : 'SO2',
	credit_control : '',
};

function AuthorityDesk() {
	const { role } = useStakeholderCheck();

	const router = useRouter();
	const [activeTab, setActiveTab] = useState('ocean');

	const handleVersionChange = useCallback((tab) => {
		const newHref = `${window.location.origin}/${router?.query?.partner_id}/bl-do?active_tab=${tab}`;
		window.location.replace(newHref);
		window.sessionStorage.setItem('prev_nav', newHref);
	}, [router?.query?.partner_id]);

	const onChange = (tab) => {
		if (tab === 'ocean') return;

		setActiveTab(tab);
		handleVersionChange(tab);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>{`${ROLE_NAME[role]} Authority Desk`}</div>
				{role === 'kam'
				&& <GoToKamDesk />}
			</div>

			<Tabs
				themeType="tertiary"
				activeTab={activeTab}
				onChange={(tab) => onChange(tab)}
			>
				<TabPanel
					key="ocean"
					name="ocean"
					title="OCEAN"
				>
					<Ocean />
				</TabPanel>

				<TabPanel key="air" name="air" title="AIR" />

				<TabPanel key="surface" name="surface" title="SURFACE" />
			</Tabs>
		</div>
	);
}

export default AuthorityDesk;
