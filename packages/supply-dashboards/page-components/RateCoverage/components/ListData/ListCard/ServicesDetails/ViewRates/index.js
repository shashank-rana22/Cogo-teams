import { Table, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from '../styles.module.css';

function ViewRates({ rateList = [] }) {
	const columns = [
		{ Header: 'Code', accessor: 'code' },
		{ Header: 'Buy Price', accessor: 'buy_price' },
		{ Header: 'Currency', accessor: 'currency' },
		{ Header: 'Unit', accessor: 'unit' },
	];

	return (
		<div className={styles.pop_container}>
			<div className={styles.heading}>
				Service Rates
			</div>

			{(rateList || []).map((item) => (
				<div className={styles.item} key={item.id}>
					<div className={styles.heading}>
						{startCase(item?.service_type)}
					</div>
					<div className={styles.pair_container}>
						<div className={styles.key} style={{ color: '#5B6194' }}>Service Provider : </div>

						<Tooltip
							placement="bottom"
							theme="light"
							content={(
								<div style={{ fontSize: '10px' }}>
									{startCase(item?.service_provider?.business_name)
											|| 'Not available'}
								</div>
							)}
						>
							<div className={styles.value} style={{ color: '#5B6194', maxWidth: '250px' }}>
								{startCase(item?.service_provider?.business_name)
										|| 'Not available'}
							</div>
						</Tooltip>
					</div>

					<Table columns={columns} data={item?.line_items} />
				</div>
			))}
		</div>
	);
}

export default ViewRates;
