import { Pill } from '@cogoport/components';
import { IcMAir, IcMFcl, IcMLcl } from '@cogoport/icons-react';
import { useState } from 'react';

import SureModal from '../../../../common/SureModal';
import PortPair from '../../../PageView/List/Card/PortPair';

import Footer from './Footer';
import styles from './styles.module.css';

const iconMapping = {
	fcl_freight : IcMFcl,
	lcl_freight : IcMLcl,
	air_freight : IcMAir,
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

	const Element = iconMapping[portPair?.service_type || 'fcl_freight'];
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
							{`${portPair?.service_type?.split('_')[0]} ${
								portPair?.service_type?.split('_')[1]
							}`}
						</div>
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
		</div>
	);
}

export default Content;
