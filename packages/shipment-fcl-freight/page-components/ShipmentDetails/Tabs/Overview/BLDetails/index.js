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

	const { shipment_data, documents, container_details } = useContext(
		ShipmentDetailContext,
	);

	const renderBlCount = (
		<div className={styles.bl_count_container}>
			BL and Container Details
			<div className="bl-count">
				(
				{documents?.length || 0}
				&nbsp;BL & &nbsp;
				{container_details?.length || 0}
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
				className="sm"
				style={{ marginLeft: '6px' }}
			>
				Bl Container Mapping
			</Button>

			<Button
				onClick={(e) => {
					setEditContainerNum(true);
					e.stopPropagation();
				}}
				className="sm"
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
						shipment_data={shipment_data}
					/>
				</Modal>
			) : null}
		</div>
	);

	const contentMapping = {
		air_freight : 'AWB',
		fcl_freight : 'BL',
		lcl_freight : 'BL',
	};

	const emptyStateContent = {
		heading: `No ${contentMapping[shipment_data?.shipment_type]
		} Details Found!`,
		description: `Currently ${contentMapping[shipment_data?.shipment_type]
		} is not uploaded from the respective stakeholder.`,
	};

	return (
		<div className={styles.container}>
			<div className={styles.button_div}>{buttons()}</div>
			<Accordion title={renderBlCount} style={{ width: '100%' }}>
				{!loading && !data?.list?.length ? (
					<EmptyState showContent={emptyStateContent} />
				) : (
					<div className={styles.manage_services_div}>
						{data?.list?.map((item) => (
							<div className={styles.service_card}>
								<TitleCard
									item={item}
									setOpen={setOpen}
									open={open}
									setActiveId={setActiveId}
									activeId={activeId}
									shipment_data={shipment_data}
								/>

								{open
								&& activeId === item?.id ? (
									<ContainerDetails containerDetails={item?.container_details} />
									) : null}
							</div>
						))}
					</div>
				)}
			</Accordion>
		</div>
	);
}

export default BLDetails;
