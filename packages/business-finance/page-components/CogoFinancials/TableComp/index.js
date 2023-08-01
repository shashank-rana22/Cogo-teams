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
	customDate = new Date(),
	taxType = '',
	type = '',
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
		customDate,
	});
	return (
		<div className={styles.table}>
			<Header config={config} />
			{(serviceLevelData?.list || []).map((item) => (
				<ColumnCard
					config={config}
					key={item?.id}
					item={item}
					taxType={taxType}
					type={type}
				/>
			))}
		</div>
	);
}

export default TableComp;
