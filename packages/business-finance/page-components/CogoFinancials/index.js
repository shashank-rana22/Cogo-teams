import { Select, Toggle } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import SegmentedControl from '../commons/SegmentedControl/index.tsx';

import MultipleFilters from './MultipleFilters';
import styles from './styles.module.css';

const TIME_RANGE_OPTIONS = [
	{ label: '1D', value: '1D' },
	{ label: '1W', value: '1W' },
	{ label: '1M', value: '1M' },
	{ label: '6M', value: '6M' },
	{ label: '1Y', value: '1Y' },
];

const geo = getGeoConstants();
const countryCode = geo?.country.code;
const DEFAULT_ENTITY_DATA = Object.values(GLOBAL_CONSTANTS.cogoport_entities)?.filter(
	(item) => item.country_code === countryCode,
);
const DEFAULT_ENTITY = DEFAULT_ENTITY_DATA[GLOBAL_CONSTANTS.zeroth_index]?.default_entity_code;

const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities)?.map((item) => ({
	value : String(item),
	label : `${item} - ${GLOBAL_CONSTANTS.cogoport_entities[item].name}`,
}));

function CogoFinancials() {
	const [isPreTax, setIsPreTax] = useState(true);
	const [timeRange, setTimeRange] = useState('1D');
	const [entity, setEntity] = useState(DEFAULT_ENTITY);

	return (
		<div>
			<div className={styles.header}>
				<div><h2>COGO Financials</h2></div>
				<div style={{ display: 'flex' }}>
					<Toggle
						name="taxType"
						size="md"
						offLabel="Pre Tax"
						onLabel="Post Tax"
						onChange={() => setIsPreTax(!isPreTax)}
					/>
					<div style={{ margin: '0px 12px' }}>
						<SegmentedControl
							options={TIME_RANGE_OPTIONS}
							activeTab={timeRange}
							setActiveTab={setTimeRange}
							color="#ED3726"
							background="#FFFAEB"
						/>
					</div>
					<MultipleFilters />
					<Select
						value={entity}
						onChange={setEntity}
						options={ENTITY_OPTIONS}
						style={{ width: '320px' }}
					/>
				</div>

			</div>
			<div className={styles.financially_closed_container}>
				<div className={styles.financial_header}>
					<div>Financially Closed Shipments</div>
					<div className={styles.info}><IcMInfo /></div>
				</div>
				<hr className={styles.bottom_line} />
			</div>
		</div>
	);
}

export default CogoFinancials;
