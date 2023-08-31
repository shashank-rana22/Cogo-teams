import { Button, Select, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlatformDemo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import SegmentedControl from '../../commons/SegmentedControl/index.tsx';
import { getTimeRangeOptions } from '../constants';
import MultipleFilters from '../MultipleFilters';

import styles from './styles.module.css';

const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities)?.map((item) => ({
	value : String(item),
	label : `${item} - ${GLOBAL_CONSTANTS.cogoport_entities[item].name}`,
}));

function HeadingSection({
	setShowShipmentList = () => {},
	setActiveBar = () => {},
	setActiveShipmentCard = () => {},
	setIsTourInitial = () => {},
	setTour = () => {},
	setIsPreTax = () => {},
	isPreTax = true,
	customDate = new Date(),
	setCustomDate = () => {},
	timeRange = '',
	setTimeRange = () => {},
	filter = {},
	setFilter = () => {},
	entity = '',
	setEntity = () => {},
}) {
	const [isDateVisible, setIsDateVisible] = useState(false);

	const handleClick = () => {
		setShowShipmentList(false);
		setActiveBar('');
		setActiveShipmentCard('');
		setIsTourInitial(true);
	};

	const handleTourClick = () => {
		setTour(true);
		handleClick();
	};

	return (
		<div className={styles.header}>
			<div
				role="presentation"
				onClick={handleClick}
			>
				<h2 className={styles.main_heading} data-tour="main-heading">COGO Financials</h2>
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Button
					onClick={handleTourClick}
					className={styles.tour_btn}
				>
					<IcMPlatformDemo height={14} width={14} style={{ marginRight: '8px' }} />
					Start Tour
				</Button>
				<Toggle
					name="taxType"
					size="md"
					offLabel="Pre Tax"
					onLabel="Post Tax"
					onChange={() => setIsPreTax(!isPreTax)}
				/>
				<div className={styles.segmented_section}>
					<SegmentedControl
						options={getTimeRangeOptions({
							customDate,
							setCustomDate,
							isDateVisible,
							setIsDateVisible,
						})}
						activeTab={timeRange}
						setActiveTab={setTimeRange}
						color="#ED3726"
						background="#FFE69D"
						style={{ overflow: 'visible' }}
					/>
				</div>
				<MultipleFilters
					filter={filter}
					setFilter={setFilter}
					entity={entity}
				/>
				<Select
					value={entity}
					onChange={setEntity}
					options={ENTITY_OPTIONS}
					className={styles.entity_select}
				/>
			</div>
		</div>
	);
}

export default HeadingSection;
