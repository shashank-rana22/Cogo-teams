import { Button, Modal, Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import useListBillOfLadings from '../../../hooks/useListBillOfLadings';
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
				{list?.length || primary_service?.bls_count || 0}
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
			{!isEmpty(list)
				? (
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
				)

				: null}

			{!isEmpty(containerDetailsArray)
				? (
					<Button
						onClick={(e) => {
							setEditContainerNum(true);
							e.stopPropagation();
						}}
						size="md"
					>
						Update Container Number
					</Button>
				) : null}
		</div>
	);

	const emptyStateContent = {
		heading     : 'No BL Details Found!',
		description : 'Currently BL is not uploaded from the respective stakeholder.',
	};

	return (
		<div className={styles.container}>
			<div className={styles.button_div}>{renderButtons()}</div>

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
						{(list || []).map((doc) => (
							doc?.containers?.length >= 1
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
													containerDetails={doc?.containers}
												/>
											)}
										>
											<ContainerDetails containerDetails={doc?.containers} />
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
											containerDetails={doc?.containers}
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
						data={list}
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
