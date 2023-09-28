import { Tabs, TabPanel, ButtonIcon } from '@cogoport/components';
import { IcMArrowRotateLeft, IcMArrowRotateRight } from '@cogoport/icons-react';
import { useContext, useRef, useState } from 'react';

import shipmentTabMapping from '../../config/SHIPMENT_TAB_MAPPING';
import { CRITICAL_TABS } from '../../config/SHIPMENTS_PAYLOAD';
import KamDeskContext from '../../context/KamDeskContext';

import styles from './styles.module.css';

const SCROLL_DIVISOR = 2;
const MIN_INDEX_FOR_SCROLL = 5;

function DeskTabs() {
	const scrollRef = useRef('');
	const tabs_container = scrollRef.current;
	const scrollWidth = window.innerWidth / SCROLL_DIVISOR;

	const { stepperTab, shipmentType, activeTab, setActiveTab, setFilters, filters } = useContext(KamDeskContext);

	const [windowSize, setWindowSize] = useState(window.innerWidth);

	const tabs = shipmentTabMapping[shipmentType]?.tabs || shipmentTabMapping[shipmentType]?.[stepperTab]?.tabs || [];

	const totalTabs = tabs.length;

	const scrollOnTabs = tabs?.map((item, index) => {
		if (totalTabs - index < MIN_INDEX_FOR_SCROLL) {
			return {
				val   : item?.value,
				shift : +scrollWidth,
			};
		}

		if (index < MIN_INDEX_FOR_SCROLL) {
			return {
				val   : item?.value,
				shift : -scrollWidth,
			};
		}
		return null;
	}).filter((item) => item !== null);

	const slide = (shift) => {
		tabs_container.scrollLeft += shift;
	};

	const handleChange = (val) => {
		if (val !== activeTab) {
			const isCritical = !!CRITICAL_TABS?.[shipmentType]?.[stepperTab]?.[val];

			setActiveTab(val);

			setFilters({
				...filters,
				page: 1,
				...(isCritical && filters.criticalOn ? { criticalOn: true } : {}),
			});

			const shouldScrollObject = scrollOnTabs.find((obj) => obj?.val === val);

			if (shouldScrollObject) {
				slide(shouldScrollObject?.shift);
			}
		}
	};

	function handleWindowResize() {
		const windowWidth = window.innerWidth;

		if (windowSize !== windowWidth) setWindowSize(windowWidth);
	}
	window.addEventListener('resize', handleWindowResize);
	handleWindowResize();

	const tabs_container_width = tabs_container.scrollWidth;

	return (
		<div className={styles.container}>

			{ tabs_container_width > windowSize ? (
				<ButtonIcon
					size="md"
					icon={<IcMArrowRotateLeft width={20} height={20} />}
					onClick={() => slide(-scrollWidth)}
					className={styles.btn_left}
				/>
			) : null}

			<div className={styles.tabs_container} ref={scrollRef}>
				<Tabs
					themeType="secondary"
					activeTab={activeTab}
					onChange={handleChange}
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

			{tabs_container_width > windowSize ? (
				<ButtonIcon
					size="md"
					icon={<IcMArrowRotateRight width={20} height={20} />}
					onClick={() => slide(scrollWidth)}
					className={styles.btn_right}
				/>
			) : null}
		</div>
	);
}

export default DeskTabs;
