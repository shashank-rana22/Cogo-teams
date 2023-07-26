import dynamic from 'next/dynamic';
import React from 'react';

import Filters from '../../../../common/Filters';

import RefreshRate from './RefreshRate';
import styles from './styles.module.css';

const CopyUrl = dynamic(() => import('./CopyUrl'), { ssr: false });

function Header({
	details = {},
	filters = {},
	setFilters = () => {},
	refetch = () => {},
	total_rates_count = 0,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.count}>{`${total_rates_count} Results Found for your search`}</div>

			<div className={styles.filters_container}>
				{/* <Currency
					filters={filters}
					setFilters={setFilters}
					filterKey="currency"
				/> */}

				{/* <DetentionDemurrage /> */}

				<Filters
					data={details}
					filters={filters}
					setFilters={setFilters}
				/>

				<RefreshRate refetch={refetch} details={details} />

				<CopyUrl details={details} />
			</div>
		</div>

	);
}

export default Header;
