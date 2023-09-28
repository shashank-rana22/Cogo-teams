import { Tabs, TabPanel } from '@cogoport/components';
import { IcMArrowRotateLeft, IcMArrowRotateRight } from '@cogoport/icons-react';
import { useContext, useRef } from 'react';

import shipmentTabMapping from '../../config/SHIPMENT_TAB_MAPPING';
import { CRITICAL_TABS } from '../../config/SHIPMENTS_PAYLOAD';
import KamDeskContext from '../../context/KamDeskContext';

import styles from './styles.module.css';

const SCROLL_DIVISOR = 2;

function DeskTabs() {
	const scrollRef = useRef('');
	const tabs_container = scrollRef.current;
	const scrollWidth = window.innerWidth / SCROLL_DIVISOR;

	const { stepperTab, shipmentType, activeTab, setActiveTab, setFilters, filters } = useContext(KamDeskContext);

	const tabs = shipmentTabMapping[shipmentType]?.tabs || shipmentTabMapping[shipmentType]?.[stepperTab]?.tabs || [];

	const handleChange = (val) => {
		if (val !== activeTab) {
			const isCritical = !!CRITICAL_TABS?.[shipmentType]?.[stepperTab]?.[val];

			setActiveTab(val);

			setFilters({
				...filters,
				page: 1,
				...(isCritical && filters.criticalOn ? { criticalOn: true } : {}),
			});
		}
	};

	const slide = (shift) => {
		tabs_container.scrollLeft += shift;
	};

	return (
		<div className={styles.container}>

			<button
				onClick={() => slide(-scrollWidth)}
				className={styles.btn_left}
			>
				<IcMArrowRotateLeft width={16} height={16} />
			</button>

			<div className={styles.tabs_container} ref={scrollRef}>
				<Tabs
					themeType="secondary"
					activeTab={activeTab}
					onChange={handleChange}
					className={styles.tabs}
				>
					{tabs?.map((tab) => (
						<TabPanel
							title={tab.label}
							key={tab.value}
							name={tab.value}
						/>
					))}
				</Tabs>
			</div>

			<button
				onClick={() => slide(+scrollWidth)}
				className={styles.btn_right}
			>
				<IcMArrowRotateRight width={16} height={16} />
			</button>
		</div>
	);
}

export default DeskTabs;
