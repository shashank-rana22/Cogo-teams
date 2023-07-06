import { Button, Pill, Table } from '@cogoport/components';
import { useState } from 'react';

import useGetOrganizationServiceExpertises from '../../../hooks/useGetOrganizationServiceExpertises';

import EvaluateModal from './EvaluateModal';
import styles from './styles.module.css';

function NeedAnalysis({ setStatus, organization_id, id }) {
	const {
		data:serviceExpertiseData,
		loading:loadingSE,
	} = useGetOrganizationServiceExpertises({ organization_id, service_id: id });

	const [show, setShow] = useState(false);

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
				<Button themeType="accent" onClick={() => setShow(true)}>
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
			{
			!loadingSE
			&& <Table columns={columns} data={data} className={styles.table} />
		}
			<div className={styles.submit_btn}>
				<Button onClick={() => setStatus('market_feedback')}>
					Submit & Next
				</Button>
			</div>
			<EvaluateModal show={show} setShow={setShow} />
		</>
	);
}
export default NeedAnalysis;
