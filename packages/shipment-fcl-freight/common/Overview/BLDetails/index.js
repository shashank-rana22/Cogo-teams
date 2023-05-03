import { Button, Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import React, { useState, useContext } from 'react';

import useListBillOfLadings from '../../../hooks/useListBillOfLadings';

import BlContainersMapping from './BlContainersMapping';
import ContainerDetails from './ContainerDetails';
import ContainerNmUpdate from './ContainerNumUpdate';
import styles from './styles.module.css';
import TitleCard from './TitleCard';

function BLDetails() {
	const [open, setOpen] = useState(false);
	const [activeId, setActiveId] = useState('');
	const [showModal, setShowModal] = useState(false);

	const { shipment_data, primary_service } = useContext(
		ShipmentDetailContext,
	);

	let containersCount = 0;
	(primary_service?.cargo_details || []).forEach((container) => {
		containersCount += container?.containers_count || 0;
	});

	const { list, containerDetails, refetch } = useListBillOfLadings({ shipment_data });

	const containerDetailsArray = containerDetails?.[shipment_data?.id];

	const renderBlCount = (
		<div className={styles.bl_count_container}>
			BL and Container Details
			<div className="bl-count">
				(
				{primary_service?.bls_count || 0}
				&nbsp;BL & &nbsp;
				{containerDetailsArray?.length || containersCount || 0}
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

	const emptyStateContent = {
		heading     : 'No BL Details Found!',
		description : 'Currently BL is not uploaded from the respective stakeholder.',
	};

	return (
		<div className={styles.container}>

			{containerDetailsArray?.[0]?.container_number
				? <div className={styles.button_div}>{renderButtons()}</div> : null}

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
							item?.containers?.length >= 1
								? (
									<div className={styles.service_card}>
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
								: (
									<div className={styles.service_card}>
										<TitleCard
											item={item}
											setOpen={setOpen}
											open={open}
											setActiveId={setActiveId}
											activeId={activeId}
											shipmentData={shipment_data}
											containerDetails={item?.containers}
										/>
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
