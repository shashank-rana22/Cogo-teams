import { Button, Pill, Table } from '@cogoport/components';
import { useState } from 'react';

import useGetOrganizationServiceExpertises from '../../../hooks/useGetOrganizationServiceExpertises';
import useUpdateOrganizationService from '../../../hooks/useUpdateOrganizationService';

import EvaluateModal from './EvaluateModal';
import styles from './styles.module.css';

function NeedAnalysis({ organization_id, id, service, getOrganizationService }) {
	const {
		data: serviceExpertiseData,
		loading:loadingSE,
	} = useGetOrganizationServiceExpertises({ organization_id, service_id: id });

	const { UpdateOrganizationService } = useUpdateOrganizationService({
		organization_id, stage_of_approval: 'market_feedback', service, getOrganizationService,
	});

	const [show, setShow] = useState('');

	const handleSubmit = () => {
		UpdateOrganizationService();
		// setStatus('market_feedback');
	};
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
			accessor : (row) => (
				<Button themeType="accent" onClick={() => setShow(row?.id)}>
					Evaluate
				</Button>
			),
		},
	];
	// const data = [
	// 	{
	// 		id                     : 'aaeb3615-1a56-4edd-bd57-b90e53e6a8da',
	// 		origin_country         : 'India',
	// 		destination_trade_lane : 'West Coast',
	// 		current_supplier       : '8 Suppliers',
	// 		volume_served          : '2000 Containers',
	// 		status                 : 'completed',
	// 	},
	// 	{
	// 		id                     : '2341',
	// 		origin_country         : 'India',
	// 		destination_trade_lane : 'West Coast',
	// 		current_supplier       : '8 Suppliers',
	// 		volume_served          : '2000 Containers',
	// 		status                 : 'completed',
	// 	},
	// 	{
	// 		id                     : '3214',
	// 		origin_country         : 'India',
	// 		destination_trade_lane : 'West Coast',
	// 		current_supplier       : '8 Suppliers',
	// 		volume_served          : '2000 Containers',
	// 		status                 : 'completed',
	// 	},

	// ];

	return (
		<>
			{
			!loadingSE && serviceExpertiseData
			&& <Table columns={columns} data={serviceExpertiseData} className={styles.table} />
		}
			<div className={styles.submit_btn}>
				<Button onClick={handleSubmit}>
					Submit & Next
				</Button>
			</div>
			<EvaluateModal show={show} setShow={setShow} />
		</>
	);
}
export default NeedAnalysis;
