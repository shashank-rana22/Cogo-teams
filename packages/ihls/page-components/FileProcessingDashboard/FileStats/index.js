import { Placeholder, cl } from '@cogoport/components';
import React from 'react';

import FILTER_MAPPING from '../../../config/FILTER_MAPPING.json';

import styles from './styles.module.css';

const CONVERSTION_STATS_MAPPING = {
	total                   : 'Total Files',
	uploaded                : 'Uploaded',
	processing              : 'Processing',
	raw_record_created      : 'Raw Record',
	lead_created            : 'Lead Created',
	shipment_record_created : 'Shipment Record',
	success                 : 'Completed',
	failure                 : 'Failed',
};

function FileStats({
	conversionKey = '', SVG_MAPPING = {}, stat = 0, loading = false,
	setIsSelectedKey = () => {}, isSelectedKey = '', setHeading = () => {}, setFilters = () => {},
}) {
	if (loading) {
		return (<Placeholder height="70px" width="90px" />);
	}

	const handleContainerClick = () => {
		setIsSelectedKey(conversionKey);
		setHeading(CONVERSTION_STATS_MAPPING[conversionKey]);
		setFilters({
			status: FILTER_MAPPING[conversionKey]
				? [FILTER_MAPPING[conversionKey]]
				: undefined,
		});
	};
	return (
		<button
			onClick={handleContainerClick}
			className={cl`${styles.container} ${(conversionKey === isSelectedKey) ? styles.active : ''}`}
		>
			<div className={styles.file_header} style={{ color: '#828282', marginLeft: 3 }}>
				{SVG_MAPPING[conversionKey]}
				<div className={styles.text}>
					{CONVERSTION_STATS_MAPPING[conversionKey]}
				</div>
			</div>
			<div
				style={{ display: 'flex', alignItems: 'center', paddingTop: 8, borderTop: '1px solid #E0E0E0' }}
				className={styles.file_data}
			>
				{stat}
			</div>
		</button>
	);
}

export default FileStats;
