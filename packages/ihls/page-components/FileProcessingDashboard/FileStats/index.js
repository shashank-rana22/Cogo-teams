import { Placeholder, cl } from '@cogoport/components';
import React from 'react';

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

const FILTER_MAPPING = {
	total                   : undefined,
	uploaded                : 'uploaded',
	processing              : 'processing',
	raw_record_created      : 'raw_record_created',
	lead_created            : 'lead_created',
	shipment_record_created : 'shipment_record_created',
	success                 : 'success',
	failure                 : 'failure',
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
			<div className={styles.file_header}>
				{SVG_MAPPING[conversionKey]}
				<div style={{ color: '#828282', marginLeft: 3 }} className={styles.text}>
					{CONVERSTION_STATS_MAPPING[conversionKey]}
				</div>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', paddingTop: 8, borderTop: '1px solid #E0E0E0' }}>
				<div className={styles.file_data}>
					{stat}
				</div>
			</div>
		</button>
	);
}

export default FileStats;
