import EmptyState from '@cogoport/air-modules/common/EmptyState';
import { Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import CONSTANTS from '../../../constants/CONSTANTS';
import useListBillOfLadings from '../../../hooks/useListBillOfLadings';

import styles from './styles.module.css';
import TitleCard from './TitleCard';

const EMPTY_STATE_CONTENT = {
	heading     : 'No AWB Details Found!',
	description : 'Currently AWB is not uploaded from the respective stakeholder.',
};

const { EMPTY_LIST_LENGTH } = CONSTANTS;

function AWBDetails() {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { list } = useListBillOfLadings({ shipment_data });

	const renderBlCount = (
		<div className={styles.bl_count_container}>
			AWB Details
			<div className={styles.bl_count}>
				(
				{list?.length || EMPTY_LIST_LENGTH}
				&nbsp;AWB&apos;s
				)
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<Accordion title={renderBlCount} style={{ width: '100%' }}>
				{!list?.length ? (
					<EmptyState
						showContent={EMPTY_STATE_CONTENT}
						textSize="20px"
						emptyText="No AWB Details Found!"
						subEmptyText="Currently AWB is not uploaded from the respective stakeholder."
					/>
				) : (
					<div className={styles.manage_services_div}>
						{(list || []).map((item) => (
							<div key={item?.bl_number} className={styles.service_card}>
								<TitleCard item={item} />
							</div>
						))}
					</div>
				)}
			</Accordion>
		</div>
	);
}

export default AWBDetails;
