import { Placeholder } from '@cogoport/components';
import { useState } from 'react';

import CardInfo from '../../../common/CardInfo';
import CardPopover from '../../../common/CardPopover';
import EmptyCard from '../../../common/EmptyCard';
import useRedirectFn from '../../../hooks/useRedirectFn';
import getLoadingArr from '../../../utils/getLoadingArr';

import Footer from './Footer';
import ShipmentInfo from './ShipmentInfo';
import Stepper from './Stepper';
import styles from './styles.module.css';

const LOADING_ARR = getLoadingArr(3);

function AirCard({ listItem = {}, loading = false, activeTab, setModalInfo, refetchTrackerList }) {
	const [showPopover, setShowPopover] = useState(false);
	const { redirectToTracker } = useRedirectFn();

	const {
		id = '', input = '', air_cargo_details = {}, airline = {}, last_updated_at = '',
		commodity_details = {}, milestones = {}, action = {}, tracking_status = '',
	} = listItem || {};

	const isTrackerEmpty = tracking_status !== 'Found';

	if (isTrackerEmpty && !loading) {
		return (
			<EmptyCard
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
							<CardInfo activeTab={activeTab} input={input} />
							<Stepper
								lineInfo={airline}
								airCargoDetails={air_cargo_details}
								activeTab={activeTab}
							/>
						</>
					)}
				</div>
				<div className={styles.dashed_line} />
				<div className={styles.shipment_details_container}>
					<div className={styles.shipment_info}>
						<ShipmentInfo
							activeTab={activeTab}
							shipmentInfo={commodity_details}
							airCargoDetails={air_cargo_details}
							loading={loading}
						/>
					</div>
					<div className={styles.setting}>
						<CardPopover
							showPopover={showPopover}
							setShowPopover={setShowPopover}
							setModalInfo={setModalInfo}
							id={id}
						/>
					</div>
				</div>
			</div>
			<Footer milestones={milestones} action={action} lastUpdated={last_updated_at} />
		</div>
	);
}

export default AirCard;
