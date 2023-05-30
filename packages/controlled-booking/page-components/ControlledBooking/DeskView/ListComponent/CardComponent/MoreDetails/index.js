import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import ContainerDetails from './ContainerDetails';
import styles from './styles.module.css';

const handleDownload = (val) => {
	if (val) {
		window.open(val, '_blank');
	}
};

function MoreDetails({ primaryServiceDetails = {}, approvals }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Shipment
			</div>
			<div style={{ display: 'flex' }}>
				<div className={styles.container_detials}>
					<div>
						Container and Commodity Details
					</div>

					<div
						className={styles.approvals}
						role="presentation"
						onClick={() => handleDownload(approvals?.[0]?.manager_approval_proof)}
					>
						<IcMDownload style={{ marginRight: 4 }} />
						Manager approval Proof
					</div>

				</div>

				<div className={styles.frieght_value}>
					Cargo to Freight Value
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ width: '75%' }}>
					{(primaryServiceDetails || [])?.map((childItem, index) => (
						<ContainerDetails key={childItem.id} details={childItem} index={index} />
					))}
				</div>

				<div className={styles.cargo_value}>
					<div style={{ color: '#828282' }}>
						Total Frieght value:
					</div>
					<div style={{ color: '#828282' }}>
						Total Cargo value:
					</div>
					<div className={styles.eligibilty} style={{ backgroundColor: '#FDEBE9' }}>
						<div style={{
							color      : '#EE3425',
							fontWeight : '600',
							fontSize   : '18px',
						}}
						>
							67%
						</div>
						<div style={{
							color: '#EE3425',
						}}
						>
							Not eligible for Reefers
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}
export default MoreDetails;
