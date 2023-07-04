import { Button, Pill, Table } from '@cogoport/components';

import styles from './styles.module.css';

function NeedAnalysys() {
	const columns = [
		{ Header: 'Origin Country', accessor: 'origin_country' },
		{ Header: 'Destination Trade Lane', accessor: 'destination_trade_lane' },
		{ Header: 'Current Supplier (Total Count)', accessor: 'current_supplier' },
		{ Header: 'Volume Served (Total Containers)', accessor: 'volume_served' },
		{
			id     : 'status',
			Header : () => (
				<div className={styles.th}>
					Status
				</div>
			),
			accessor: (row) => (
				<div className={styles.td}>
					<Pill color="green">{row?.status}</Pill>
				</div>
			),
		},
		{
			Header   : ' ',
			accessor : () => (
				<Button themeType="accent">
					Evaluate
				</Button>
			),
		},
	];
	const data = [
		{
			origin_country         : 'India',
			destination_trade_lane : 'West Coast',
			current_supplier       : '8 Suppliers',
			volume_served          : '2000 Containers',
			status                 : 'completed',
		},
		{
			origin_country         : 'India',
			destination_trade_lane : 'West Coast',
			current_supplier       : '8 Suppliers',
			volume_served          : '2000 Containers',
			status                 : 'completed',
		},
		{
			origin_country         : 'India',
			destination_trade_lane : 'West Coast',
			current_supplier       : '8 Suppliers',
			volume_served          : '2000 Containers',
			status                 : 'completed',
		},

	];

	return (
		<>
			<Table columns={columns} data={data} className={styles.table} />
			<div className={styles.submit_btn}>
				<Button>
					Submit & Next
				</Button>
			</div>
		</>
	);
}
export default NeedAnalysys;
