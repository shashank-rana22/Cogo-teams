import { Pill, Button, Modal, Tooltip } from '@cogoport/components';
import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
	IcMPortArrow,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import AddRate from './AddRate';
import RateModal from './RatesModal';
import styles from './styles.module.css';

function Service({
	selectedCard,
	service,
	activeService,
	setActiveService,
	submittedEnquiry,
	setSubmittedEnquiry,
	setRevertCounts,
}) {
	const [selectedRate, setSelectedRate] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const tradetype = service?.data?.trade_type === 'import' ? 'Destination' : 'Origin';
	const status = submittedEnquiry.includes(`${service?.id}${service?.service}`)
		? 'Submitted!' : 'Pending';
	const handleClick = () => {
		if (activeService === service) {
			setActiveService(null);
			setSelectedRate(null);
		} else {
			setActiveService(service);
		}
	};

	const handleOnClick = (e) => {
		e.stopPropagation();
		setActiveService(null);
		setShowModal(true);
	};
	const handleOnClose = () => {
		setSelectedRate(null);
		setShowModal(false);
	};

	useEffect(() => {
		if (selectedRate && !showModal) {
			setActiveService(service);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);

	const origin = service?.data?.origin_location?.name || service?.data?.port?.name
	|| service?.data?.origin_airport?.name || service?.data?.origin_port?.name || service?.data?.location?.name
	|| service?.data?.airport?.name;
	const destination = service?.data?.destination_location?.name || service?.data?.destination_airport?.name
	|| service?.data?.destination_port?.name;

	const originAddress = (
		<div>
			{origin}
			<br />
			{service?.service === 'trailer_freight' && tradetype === 'Origin' && service?.data?.address}
		</div>
	);
	const destinationAddress = (
		<div>
			{destination}
			<br />
			{service?.service === 'trailer_freight' && tradetype === 'Destination' && service?.data?.address}
		</div>
	);

	return (
		<div className={styles.container}>
			<div
				className={styles.service}
				role="presentation"
				onClick={() => {
					handleClick();
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{activeService === service ? (
						<IcMArrowRotateDown />
					) : (
						<IcMArrowRotateRight />
					)}
					{selectedCard?.detail.service_type === service?.service
						? 'Freight Rate'
						: `${tradetype} ${startCase(service?.service)}`}
				</div>
				<div className={styles.location}>
					<Tooltip content={originAddress}>
						<div className={styles.port}>{origin}</div>
					</Tooltip>
					{destination ? (
						<>
							<IcMPortArrow style={{ paddingTop: '2px', margin: '4px' }} />
							<Tooltip content={destinationAddress}>
								<div className={styles.port}>{destination}</div>
							</Tooltip>
						</>
					) : null}

				</div>
				<div className={styles.action}>
					<Pill color={status === 'Submitted!' ? '#849E4C' : '#F37166'}>{status}</Pill>
					<Button themeType="accent" size="sm" onClick={(e) => handleOnClick(e)}>Quick Add Rates</Button>
				</div>

			</div>
			{activeService === service && (
				<AddRate
					service={service}
					setSubmittedEnquiry={setSubmittedEnquiry}
					setActiveService={setActiveService}
					selectedRate={selectedRate}
					selectedCard={selectedCard}
					setRevertCounts={setRevertCounts}
				/>
			)}
			{showModal && (
				<Modal size="lg" show={showModal} onClose={() => handleOnClose()}>
					<RateModal
						service={service}
						setShowModal={setShowModal}
						setSelectedRate={setSelectedRate}
						selectedRate={selectedRate}
						handleOnClose={handleOnClose}
					/>
				</Modal>
			)}

		</div>
	);
}
export default Service;
