import { Placeholder } from '@cogoport/components';
import { useMemo, useState } from 'react';

import CardInfo from '../../../common/CardInfo';
import CardPopover from '../../../common/CardPopover';
import EmptyCard from '../../../common/EmptyCard';
import useRedirectFn from '../../../hooks/useRedirectFn';
import getLoadingArr from '../../../utils/getLoadingArr';

import ContainerInfo from './ContainerInfo';
import Footer from './Footer';
import Stepper from './Stepper';
import styles from './styles.module.css';

const LOADING_ARR = getLoadingArr(3);

function Card({ listItem = {}, loading = false, activeTab, setModalInfo, refetchTrackerList }) {
	const [activeContainerIndex, setActiveContainerIndex] = useState(1);
	const [showPopover, setShowPopover] = useState(false);

	const { redirectToTracker } = useRedirectFn();

	const {
		id = '',	type = '', input = '', container_details = [], milestones = [], shipping_line = {},
		shipment_info = {}, updated_at = '', action = {}, tracking_status = '', serial_id = '',
		external_reference_number: referenceNo = '',
	} = listItem || {};

	const isTrackerEmpty = tracking_status !== 'Found';

	const { currentMilestone, currentContainer, currentContainerAction, containerDetailsLength } = useMemo(() => ({
		currentMilestone       : milestones?.[activeContainerIndex - 1],
		currentContainer       : container_details?.[activeContainerIndex - 1],
		currentContainerAction : action?.[activeContainerIndex - 1],
		containerDetailsLength : container_details?.length,
	}), [action, activeContainerIndex, container_details, milestones]);

	if (isTrackerEmpty && !loading) {
		return (
			<EmptyCard
				type={type}
				input={input}
				activeTab={activeTab}
				shipmentId={id}
				refetchTrackerList={refetchTrackerList}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.main_body}>

				<div
					className={styles.stepper_container}
					onClick={() => redirectToTracker({ type: activeTab, id })}
					role="presentation"
				>
					{loading ? (
						<div className={styles.skeleton_loader}>
							{LOADING_ARR.map((ele) => (
								<Placeholder key={ele} height="30px" margin="0px 0px 20px 0px" />
							))}
						</div>
					) : (
						<>
							<CardInfo
								activeTab={activeTab}
								type={type}
								input={input}
								serialId={serial_id}
								referenceNo={referenceNo}
							/>
							<Stepper
								currentMilestone={currentMilestone}
								lineInfo={shipping_line}
								activeTab={activeTab}
							/>
						</>
					)}
				</div>

				<div className={styles.dashed_line} />

				<div className={styles.container_details}>
					<div className={styles.container_info}>
						<ContainerInfo
							currentContainer={currentContainer}
							shipmentInfo={shipment_info}
							activeContainerIndex={activeContainerIndex}
							setActiveContainerIndex={setActiveContainerIndex}
							containerDetailsLength={containerDetailsLength}
							activeTab={activeTab}
							loading={loading}
						/>
					</div>
					<div className={styles.setting}>
						<CardPopover
							showPopover={showPopover}
							setShowPopover={setShowPopover}
							setModalInfo={setModalInfo}
							shipment_info={shipment_info}
							id={id}
						/>
					</div>
				</div>

			</div>
			<Footer
				lastUpdated={updated_at}
				currentMilestone={currentMilestone}
				currentContainerAction={currentContainerAction}
			/>
		</div>
	);
}

export default Card;
