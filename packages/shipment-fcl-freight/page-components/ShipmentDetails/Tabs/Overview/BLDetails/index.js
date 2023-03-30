import { Button, Modal, Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useState, useContext } from 'react';

import EmptyState from '../../../../../common/EmptyState';

import BlContainer from './BlContainer';
import ContainerDetails from './ContainerDetails';
import ContainerNmUpdate from './ContainerNumUpdate';
import styles from './styles.module.css';
import TitleCard from './TitleCard';

function BLDetails() {
	const [open, setOpen] = useState(false);
	const [activeId, setActiveId] = useState('');
	const [mappingModal, setMappingModal] = useState(false);
	const [editContainerNum, setEditContainerNum] = useState(false);

	const { shipment_data, documents } = useContext(
		ShipmentDetailContext,
	);

	let containersCount = 0;
	const containerDetailsArray = [];

	(documents || []).forEach((doc) => {
		const containerDetailsItem = doc?.container_details;
		containersCount += containerDetailsItem?.length || 0;
		if (containerDetailsItem) containerDetailsArray.push(...containerDetailsItem);
	});

	const renderBlCount = (
		<div className={styles.bl_count_container}>
			BL and Container Details
			<div className="bl-count">
				(
				{documents?.length || 0}
				&nbsp;BL & &nbsp;
				{containersCount || 0}
				&nbsp;
				Containers
				)
			</div>
		</div>
	);

	const buttons = () => (
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

			{mappingModal ? (
				<Modal
					show={mappingModal}
					onClose={() => {
						setMappingModal(false);
					}}
				>
					<Modal.Header title="BL Container Mapping" />
					<BlContainer
						shipment_data={shipment_data}
						// data={data}
						setMappingModal={setMappingModal}
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
						shipmentData={shipment_data}
						containerDetails={containerDetailsArray}
					/>
				</Modal>
			) : null}
		</div>
	);

	const emptyStateContent = {
		heading     : 'No BL Details Found!',
		description : 'Currently BL is not uploaded from the respective stakeholder.',
	};

	return (
		<div className={styles.container}>
			<div className={styles.button_div}>{buttons()}</div>
			<Accordion title={renderBlCount} style={{ width: '100%' }}>
				{!documents?.length ? (
					<EmptyState showContent={emptyStateContent} />) : (
						<div className={styles.manage_services_div}>
							{(documents || []).map((doc) => (
								doc?.container_details?.length >= 1
									? (
										<div className={styles.service_card}>
											<Accordion title={(
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
		</div>
	);
}

export default BLDetails;
