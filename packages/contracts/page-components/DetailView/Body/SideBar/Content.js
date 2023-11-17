import { Button, Pill } from '@cogoport/components';
import { IcMAir, IcMFcl, IcMLcl, IcMLocalCharges } from '@cogoport/icons-react';
import { useState } from 'react';

import SureModal from '../../../../common/SureModal';
import useGetContractServiceShipment from '../../../../hooks/useGetContractServiceShipment';
import PortPair from '../../../PageView/List/Card/PortPair';

import Footer from './Footer';
import ShipmentDataModal from './ShowShipmentDetailModal';
import styles from './styles.module.css';

const SERVICE_MAPPING = {
	fcl_freight       : { label: 'FCL Freight', icon: IcMFcl },
	lcl_freight       : { label: 'LCL Freight', icon: IcMLcl },
	air_freight       : { label: 'AIR Freight', icon: IcMAir },
	fcl_freight_local : { label: 'FCL Freight Local', icon: IcMLocalCharges },
	lcl_freight_local : { label: 'LCL Freight Local', icon: IcMLocalCharges },
};

function Content({
	portPair,
	activePair,
	handlePortChange,
	handleUpdateContract,
	statsData,
	index,
	data,
}) {
	const [showModal, setShowModal] = useState(null);
	const [showShipmentDetialData, setShipmentDetailData] = useState(false);

	const { data: shipmentDetailData, getShipmentServiceData, loading } = useGetContractServiceShipment();

	const handleCloseModal = () => {
		setShowModal(null);
	};
	const handleFinalSubmit = () => {
		handleUpdateContract(showModal);
		setShowModal(null);
	};
	const handleApprove = () => {
		if (portPair?.status === 'pending') {
			return;
		}
		setShowModal({
			payload: {
				id           : portPair?.id,
				service_type : portPair?.service_type,
				status       : 'approved',
			},
		});
	};

	const handelShipmentServiceDetails = () => {
		getShipmentServiceData({ portPair, data });
		setShipmentDetailData(!showShipmentDetialData);
	};

	const Element = SERVICE_MAPPING[portPair?.service_type || 'fcl_freight'].icon;
	return (
		<div
			role="presentation"
			className={styles.pair}
			onClick={() => handlePortChange(portPair)}
		>
			<div
				className={activePair?.id === portPair?.id ? styles.port_pair_active : styles.port_pair_inactive}
			>
				<div className={styles.sub_container}>
					<div className={styles.service}>

						<div className={styles.display_service}>
							<Element width={30} height={30} style={{ padding: '4px' }} />
							{SERVICE_MAPPING[portPair?.service_type]?.label}
						</div>
						<Button
							size="md"
							themeType="accent"
							onClick={handelShipmentServiceDetails}
						>
							Shipment Plan
						</Button>
						<div className={styles.information}>
							{(portPair?.status === 'quoted' || portPair?.status === 'pending')
						&& data?.status === 'pending_approval' ? (
							<div className={styles.buttons}>
								<div
									className={styles.button_reject}
									role="presentation"
									onClick={(e) => {
										e.stopPropagation();
										setShowModal({
											payload: {
												id           : portPair?.id,
												service_type : portPair?.service_type,
												status       : 'rejected',
											},
										});
									}}
								>
									REJECT
								</div>
								<div
									className={portPair?.status === 'pending'
										? styles.button_pending
										: styles.button_approve}
									role="presentation"
									onClick={(e) => {
										e.stopPropagation();
										handleApprove();
									}}
								>
									APPROVE
								</div>
							</div>
								) : 	(
									<Pill
										color={portPair?.status === 'rejected' ? 'red' : 'green'}
										style={{
											padding    : '4px',
											marginLeft : '6px',
										}}
									>
										{portPair?.status === 'rejected' ? 'Rejected' : 'Approved'}
									</Pill>
								)}
							{portPair?.status === 'pending'
								? <div className={styles.info}> Locals are yet to be added</div> : null}
						</div>
					</div>

					<div className={styles.port_pair}>
						<PortPair
							portPair={portPair}
							detailView
							fromDetails
						/>
					</div>
					<Footer statsData={statsData} portPair={portPair} index={index} />
				</div>
			</div>
			<div className={styles.line} />
			<SureModal
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				handleFinalSubmit={handleFinalSubmit}
			/>
			{showShipmentDetialData && (
				<ShipmentDataModal
					shipmentDetailData={shipmentDetailData}
					showShipmentDetialData={showShipmentDetialData}
					setShipmentDetailData={setShipmentDetailData}
					loading={loading}
				/>
			)}
		</div>
	);
}

export default Content;
