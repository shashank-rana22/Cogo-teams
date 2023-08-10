import { Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import EmptyState from '@cogoport/surface-modules/common/EmptyState';
import React, { useContext } from 'react';

import useListBillOfLadings from '../../../hooks/useListBillOfLadings';

import styles from './styles.module.css';
import TitleCard from './TitleCard';

function BLDetails() {
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);

	const { list } = useListBillOfLadings({ shipment_data });

	const renderBlCount = (
		<div className={styles.bl_count_container}>
			BL Details
			<div className={styles.bl_count}>
				(
				{primary_service?.bls_count || 0}
				&nbsp;BL&apos;s
				)
			</div>
		</div>
	);

	const emptyStateContent = {
		heading     : 'No BL Details Found!',
		description : 'Currently BL is not uploaded from the respective stakeholder.',
	};

	return (
		<div className={styles.container}>
			<Accordion title={renderBlCount} style={{ width: '100%' }}>
				{!list?.length ? (
					<EmptyState
						showContent={emptyStateContent}
						textSize="20px"
						emptyText="No BL Details Found!"
						subEmptyText="Currently BL is not uploaded from the respective stakeholder."
					/>
				) : (
					<div className={styles.manage_services_div}>
						{(list || []).map((item) => (
							<div key={item?.bl_number} className={styles.service_card}>
								{item?.containers?.length >= 1 ? (
									<Accordion title={(<TitleCard item={item} />)} />
								) : <TitleCard item={item} />}
							</div>
						))}
					</div>
				)}
			</Accordion>
		</div>
	);
}

export default BLDetails;
