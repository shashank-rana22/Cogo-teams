import { TabPanel, Tabs as TabContainer, Toggle } from '@cogoport/components';
import { useContext } from 'react';

import BookingDeskContext from '../../context/BookingDeskContext';

import styles from './styles.module.css';

export default function Tabs({ tabs = [] }) {
	const { tabState: { activeTab } = {}, setTabState, filters, setFilters } = useContext(BookingDeskContext) || {};
	const { isCriticalOn, ...rest } = filters;

	const couldBeCardsCritical = !!tabs.find(
		(tab) => tab.name === activeTab,
	)?.isCriticalVisible;

	const handleActiveTabChange = (val) => {
		if (val === activeTab) {
			return;
		}

		const is_critical_visible = !!tabs.find((tab) => tab.name === val)
			.isCriticalVisible;

		setTabState((p) => ({ ...p, activeTab: val }));
		setFilters({
			...rest,
			...(is_critical_visible && { isCriticalOn }),
			page: 1,
		});
	};

	return (
		<div className={styles.container}>
			<TabContainer
				themeType="secondary"
				activeTab={activeTab}
				onChange={handleActiveTabChange}
			>
				{tabs.map((tab) => (
					<TabPanel key={tab.name} {...tab} />
				))}
			</TabContainer>

			{couldBeCardsCritical ? (
				<div className={styles.critical_container}>
					<Toggle
						size="md"
						offLabel="Critical SIDs"
						checked={isCriticalOn}
						onChange={() => {
							setFilters({ ...filters, isCriticalOn: !isCriticalOn });
						}}
					/>
				</div>
			) : null}
		</div>
	);
}
