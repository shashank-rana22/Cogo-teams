import { Button, Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useListBillOfLadings from '../../../hooks/useListBillOfLadings';

import BlContainersMapping from './BlContainersMapping';
import ContainerDetails from './ContainerDetails';
import ContainerNmUpdate from './ContainerNumUpdate';
import styles from './styles.module.css';
import TitleCard from './TitleCard';

const INCR_IN_CONTAINER_COUNT_FOR_BL = 0;
const DEFAULT_BL_COUNT = 0;
const DEFAULT_CONTAINER_COUNT = 0;

const EMPTY_STATE_CONTENT = {
	heading     : 'No BL Details Found!',
	description : 'Currently BL is not uploaded from the respective stakeholder.',
};

function BLDetails() {
	const [open, setOpen] = useState(false);
	const [activeId, setActiveId] = useState('');
	const [showModal, setShowModal] = useState(false);

	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);

	let containersCount = 0;

	(primary_service?.cargo_details || []).forEach((container) => {
		containersCount += container?.containers_count || INCR_IN_CONTAINER_COUNT_FOR_BL;
	});

	const { list, containerDetails, refetch } = useListBillOfLadings({ shipment_data });

	const containerDetailsArray = containerDetails?.[shipment_data?.id];

	const renderBlCount = (
		<div className={styles.bl_count_container}>
			BL and Container Details
			<div className="bl-count">
				(
				{primary_service?.bls_count || DEFAULT_BL_COUNT}
				&nbsp;BL & &nbsp;
				{containerDetailsArray?.length || containersCount || DEFAULT_CONTAINER_COUNT}
				&nbsp;
				Containers
				)
			</div>
		</div>
	);

	const renderButtons = () => (
		<div className={styles.button_container}>
			<Button
				onClick={() => setShowModal('container_mapping')}
				size="md"
				style={{ marginLeft: '6px' }}
				themeType="linkUi"
			>
				BL Container Mapping
			</Button>

			<Button
				onClick={() => setShowModal('container_num_update')}
				size="md"
				themeType="linkUi"
			>
				Update Container Number
			</Button>
		</div>
	);

	return (
		<div className={styles.container}>

			{containerDetailsArray?.[GLOBAL_CONSTANTS.zeroth_index]?.container_number
				? <div className={styles.button_div}>{renderButtons()}</div> : null}

			<Accordion title={renderBlCount} style={{ width: '100%' }}>
				{!list?.length ? (
					<EmptyState
						showContent={EMPTY_STATE_CONTENT}
						textSize="20px"
						emptyText="No BL Details Found!"
						subEmptyText="Currently BL is not uploaded from the respective stakeholder."
					/>
				) : (
					<div className={styles.manage_services_div}>
						{(list || []).map((item) => (
							isEmpty(item?.containers)
								? (
									<div className={styles.service_card} key={item?.id}>
										<TitleCard
											item={item}
											setOpen={setOpen}
											open={open}
											setActiveId={setActiveId}
											activeId={activeId}
											shipmentData={shipment_data}
											containerDetails={containerDetailsArray}
										/>
									</div>
								)
								: (
									<div className={styles.service_card} key={item?.id}>
										<Accordion
											title={(
												<TitleCard
													item={item}
													setOpen={setOpen}
													open={open}
													setActiveId={setActiveId}
													activeId={activeId}
													shipmentData={shipment_data}
													containerDetails={item?.containers}
												/>
											)}
										>
											<ContainerDetails
												containerDetails={item?.containers}
												cargoDetails={item?.cargo_details}
											/>
										</Accordion>
									</div>
								)
						))}
					</div>
				)}
			</Accordion>

			{showModal === 'container_mapping' ? (
				<BlContainersMapping
					data={list}
					setMappingModal={setShowModal}
					containerDetails={containerDetailsArray}
					refetch={refetch}
				/>

			) : null}

			{showModal === 'container_num_update' ? (
				<ContainerNmUpdate
					setEditContainerNum={setShowModal}
					containerDetails={containerDetailsArray}
					refetch={refetch}
				/>
			) : null}
		</div>
	);
}

export default BLDetails;
