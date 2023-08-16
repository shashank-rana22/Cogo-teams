import { dynamic } from '@cogoport/next';
import React from 'react';

import useGetShipment from '../../hooks/useGetShipment';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

import styles from './styles.module.css';

const IGMDesk = dynamic(() => import('./StakeholdersView'), { ssr: false });

const SHIPMENT_ADDITIONAL_METHODS = ['main_service',
	'documents',
	'end_to_end_shipment',
	'containers',
	'rollover_shipments',
];

function ShipmentDetails() {
	const { get } = useGetShipment({ additional_methods: SHIPMENT_ADDITIONAL_METHODS });

	const { activeStakeholder } = useStakeholderCheck();

	switch (activeStakeholder) {
		case 'igm_desk':
			return <IGMDesk get={get} activeStakeholder={activeStakeholder} />;
		default:
			return (
				<h1 className={styles.not_allowed}>
					You are not allowed to visit this page!
				</h1>
			);
	}
}

export default ShipmentDetails;
