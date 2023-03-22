import { Input } from '@cogoport/components';
import { IcMInfo, IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../../../commons/StyledTable';
import getProfitabillityColumn from '../../utils/getProfitabillityColumn';

import styles from './styles.module.css';

function Profitabillity({ searchValue, setSearchValue }) {
	const tab = [
		{
			key   : 'shipment',
			label : 'Shipment : 4.39%',
		},
		{
			key   : 'customer',
			label : 'Customer : 7.39%',
		},
	];
	const [tabs, setTabs] = useState('shipment');
	const columns = getProfitabillityColumn();
	return (
		<div>
			<div className={styles.card}>
				<div className={styles.text_filters_gap}>
					<div className={styles.text_style}>
						Profitabillity
						<div className={styles.border} />
					</div>
					<div className={styles.icon}>
						<IcMInfo />
					</div>
				</div>
				<div className={styles.container}>
					<div className={styles.flex}>
						{tab.map((item) => (
							<div
								key={item?.key}
								onClick={() => {
                                        	setTabs(item.key);
								}}
							>
								<div className={item.key === tabs ? styles.sub_container_click : styles.sub_container}>
									{item.label}
								</div>
							</div>
						))}
					</div>
					<div className={styles.search}>
						<Input
							name="q"
							size="sm"
							value={searchValue}
							onChange={(e: any) => setSearchValue(e)}
							placeholder="Search by SID/Booking Party Name.."
							suffix={(
								<div style={{ margin: '4px', display: 'flex' }}>
									<IcMSearchlight height={15} width={15} />
								</div>
							)}
						/>
					</div>
				</div>
				<div className={styles.table_data}>
					<StyledTable
						data={[]}
						columns={columns}
						imageFind="cfoDashboard"
					/>
				</div>

			</div>
		</div>
	);
}

export default Profitabillity;
