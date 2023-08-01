import React from 'react';

import ColumnCard from '../Common/CustumTable/ColumnCard';
import Header from '../Common/CustumTable/Header';
import { customersConfig } from '../Configuration/customers';
import useGetShipmentList from '../hooks/useGetShipmentList';

import styles from './styles.module.css';

function TableComp({
	activeShipmentCard = '',
	entity = '',
	timeRange = '',
	filter = '',
	statsType = '',
	activeBar = '',
}) {
	const config = customersConfig({ activeShipmentCard });
	const {
		serviceLevelData,
		// serviceLevelLoading,
		// serviceLevelApi,
	} = useGetShipmentList({
		entity,
		timeRange,
		statsType,
		filter,
		activeBar,
	});
	return (
		<div className={styles.table}>
			<Header config={config} />
			{(serviceLevelData?.list || []).map((item) => (
				<ColumnCard
					config={config}
					key={item?.id}
					item={item}
				/>
			))}
		</div>
	);
}

export default TableComp;
