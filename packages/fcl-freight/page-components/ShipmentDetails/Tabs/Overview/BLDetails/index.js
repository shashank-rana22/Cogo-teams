import { Button, Modal, Accordion } from '@cogoport/components';
import React, { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
// import { ShipmentDetailContext } from '../../../../commons/Context';
// import ManageServices from '../../../../commons/ManageServices';
// import useListContainerDetails from '../../../hooks/useListContainerDetails';
import { shipment_data, primary_service, data } from '../dummy_data';

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

	// const [{ shipment_data, primary_service }] = useContext(
	// 	ShipmentDetailContext,
	// );

	// const {
	// 	list: { data },
	// 	loading,
	// 	isMobile,
	// 	refetch,
	// } = useListContainerDetails({
	// 	shipment_id   : shipment_data?.id || undefined,
	// 	shipment_type : shipment_data?.shipment_type,
	// });

	const loading = false;

	const showConditionForBlContainerBtn = data?.list?.length
		&& shipment_data?.stakeholder_types?.some((ele) => ['superadmin', 'service_ops2'].includes(ele));

	const renderBlCount = (
		<div className={styles.bl_count_container}>
			BL and Container Details
			<div className="bl-count">
				(
				{primary_service?.bls_count || 0}
				BL’s,
				{primary_service?.containers_count || 0}
				Containers)
			</div>
			{showConditionForBlContainerBtn ? (
				<div className={styles.button_container}>
					<Button
						onClick={(e) => {
							setMappingModal(true);
							e.stopPropagation();
						}}
						className="primary sm"
						style={{ marginLeft: '6px' }}
					>
						Bl Container Mapping
					</Button>

					<Button
						onClick={(e) => {
							setEditContainerNum(true);
							e.stopPropagation();
						}}
						className="primary sm"
					>
						Update Container Number
					</Button>

					{mappingModal ? (
						<Modal
							show={mappingModal}
							onClose={() => {
								setMappingModal(false);
							}}
							// position={isMobile ? 'bottom' : ''}
							// fullscreen={isMobile}
							className="primary lg"
						>
							<BlContainer
								shipment_data={shipment_data}
								data={data}
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
							className="primary sm"
						>
							<ContainerNmUpdate
								setEditContainerNum={setEditContainerNum}
								shipment_data={shipment_data}
								refetch={refetch}
							/>
						</Modal>
					) : null}
				</div>
			) : null}
		</div>
	);

	const contentMapping = {
		air_freight: 'AWB',
		fcl_freight: 'BL',
		lcl_freight: 'BL',
	};

	const emptyStateContent = {
		heading: `No ${contentMapping[shipment_data?.shipment_type]
			} Details Found!`,
		description: `Currently ${contentMapping[shipment_data?.shipment_type]
			} is not uploaded from the respective stakeholder.`,
	};

	return (
		<Accordion title={renderBlCount} style={{ width: '100%' }}>
			{!loading && !data?.list?.length ? (
				<EmptyState isMobile={isMobile} showContent={emptyStateContent} />
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
	);
}

export default BLDetails;
