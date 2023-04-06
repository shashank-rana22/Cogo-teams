import { Button, Modal, Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import EmptyState from '../../EmptyState';

import BlContainersMapping from './BlContainersMapping';
import ContainerDetails from './ContainerDetails';
import ContainerNmUpdate from './ContainerNumUpdate';
import styles from './styles.module.css';
import TitleCard from './TitleCard';

function BLDetails() {
	const [open, setOpen] = useState(false);
	const [activeId, setActiveId] = useState('');
	const [mappingModal, setMappingModal] = useState(false);
	const [editContainerNum, setEditContainerNum] = useState(false);

	const { shipment_data, documents, refetch, primary_service } = useContext(
		ShipmentDetailContext,
	);

	let containersCount = 0;
	const containerDetailsArray = [];

	(documents || []).forEach((doc) => {
		const containerDetailsItem = doc?.container_details;
		containersCount += containerDetailsItem?.length || 0;
		if (containerDetailsItem) containerDetailsArray.push(...containerDetailsItem);
	});

	const intialContainersCount = primary_service?.cargo_details
		.reduce((accumulator, currentValue) => accumulator + currentValue.containers_count, 0);

	const renderBlCount = (
		<div className={styles.bl_count_container}>
			BL and Container Details
			<div className="bl-count">
				(
				{documents?.length || primary_service?.bls_count || 0}
				&nbsp;BL & &nbsp;
				{containersCount || intialContainersCount || 0}
				&nbsp;
				Containers
				)
			</div>
		</div>
	);

	const renderButtons = () => (
		<div className={styles.button_container}>
			<Button
				onClick={(e) => {
					setMappingModal(true);
					e.stopPropagation();
				}}
				size="md"
				style={{ marginLeft: '6px' }}
			>
				BL Container Mapping
			</Button>

			<Button
				onClick={(e) => {
					setEditContainerNum(true);
					e.stopPropagation();
				}}
				size="md"
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
			{!isEmpty(documents) ? <div className={styles.button_div}>{renderButtons()}</div> : null }

			<Accordion title={renderBlCount} style={{ width: '100%' }}>
				{!documents?.length ? (
					<EmptyState
						showContent={emptyStateContent}
						textSize="20px"
						emptyText="No BL Details Found!"
						subEmptyText="Currently BL is not uploaded from the respective stakeholder."
					/>
				) : (
					<div className={styles.manage_services_div}>
						{(documents || []).map((doc) => (
							doc?.container_details?.length >= 1
								? (
									<div className={styles.service_card}>
										<Accordion
											title={(
												<TitleCard
													item={doc}
													setOpen={setOpen}
													open={open}
													setActiveId={setActiveId}
													activeId={activeId}
													shipmentData={shipment_data}
													containerDetails={doc?.container_details}
												/>
											)}
										>
											<ContainerDetails containerDetails={doc?.container_details} />
										</Accordion>
									</div>
								)
								: (
									<div className={styles.service_card}>
										<TitleCard
											item={doc}
											setOpen={setOpen}
											open={open}
											setActiveId={setActiveId}
											activeId={activeId}
											shipmentData={shipment_data}
											containerDetails={doc?.container_details}
										/>
									</div>
								)
						))}
					</div>
				)}
			</Accordion>

			{mappingModal ? (
				<Modal
					show={mappingModal}
					onClose={() => {
						setMappingModal(false);
					}}
				>
					<Modal.Header title="BL Container Mapping" />
					<BlContainersMapping
						data={documents}
						setMappingModal={setMappingModal}
						containerDetails={containerDetailsArray}
						refetch={refetch}
					/>
				</Modal>
			) : null}

			{editContainerNum ? (
				<Modal
					show={editContainerNum}
					onClose={() => {
						setEditContainerNum(false);
					}}
				>
					<Modal.Header title="Update Container Number" />
					<ContainerNmUpdate
						setEditContainerNum={setEditContainerNum}
						containerDetails={containerDetailsArray}
						refetch={refetch}
					/>
				</Modal>
			) : null}
		</div>
	);
}

export default BLDetails;
