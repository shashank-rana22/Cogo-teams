import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import LoadingState from '../../../common/LoadingState';
import CardList from '../CardList';

import styles from './styles.module.css';

const ARRAY_LENGTH_FOR_LOADER = 5;

function HandleShipmentView({ loading, list, getDashboardData, getDahboardStatsData }) {
	if (loading) {
		return (
			<div style={{ marginTop: '10px' }}>
				{[...Array(ARRAY_LENGTH_FOR_LOADER).keys()].map((item) => (
					<div key={item}>
						<LoadingState />
					</div>
				))}
			</div>
		);
	}
	if (isEmpty(list)) {
		return (
			<div className={styles.no_data}>
				<img
					src={GLOBAL_CONSTANTS.image_url.empty_list}
					alt="empty_data"
				/>
			</div>
		);
	}
	return list?.map((item) => (
		<CardList
			itemData={item}
			key={item?.serial_id}
			getDashboardData={getDashboardData}
			getDahboardStatsData={getDahboardStatsData}
		/>
	));
}
export default HandleShipmentView;
