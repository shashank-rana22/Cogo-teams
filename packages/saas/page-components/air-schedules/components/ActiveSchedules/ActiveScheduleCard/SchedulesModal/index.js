import { Pill, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { differenceInDays } from '@cogoport/utils';
import React from 'react';

import LegsItem from './LegsItem';
import styles from './styles.module.css';

export function SchedulesModal({
	openSchedulesModal = false,
	setOpenSchedulesModal = () => {},
	schedule = {},
	shippingLine = {},
	scheduleDetails = {},
}) {
	const handleClose = () => {
		setOpenSchedulesModal(false);
	};

	const originSchedule = scheduleDetails?.origin_airport?.port_code || 'Origin';
	const destinationSchedule = scheduleDetails?.destination_airport?.port_code || 'Destination';

	const legs = schedule?.legs || [];

	return (
		<Modal show={openSchedulesModal} closeOnOuterClick showCloseIcon onClose={handleClose}>
			<Modal.Header title="Schedule Details" />
			<Modal.Body>
				<div className={styles.header_container}>
					<div className={styles.header_text_container}>
						<div className={styles.img_container}>
							<img
								src={shippingLine?.logo_url}
								alt="logo"
								width="40px"
								height="40px"
							/>
						</div>
						<div className={styles.header_text}>
							{shippingLine?.short_name}
							<span className={styles.span}>
								{schedule?.vessel_name || schedule?.transport_name}
								/
								{schedule?.voyage_number}
								(
								Service
								-
								{schedule?.service_name}
								)

							</span>
						</div>
					</div>
					<div className={styles.pills_container}>
						{schedule?.vgm_cutoff ? (
							<Pill size="md" color="#F7FAEF">
								VGM Cutoff
								:
								{formatDate({
									date       : schedule?.vgm_cutoff,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</Pill>
						) : null}
						{schedule?.terminal_cutoff ? (
							<Pill size="md" color="#F7FAEF">
								Terminal Cutoff
								:
								{formatDate({
									date       : schedule?.terminal_cutoff,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</Pill>
						) : null}
					</div>
				</div>
				<div>
					<div className={styles.main_pill_container}>
						<Pill size="md" color="#FEF3E9">
							{differenceInDays(new Date(schedule?.arrival), new Date(schedule?.departure))}
							Days

						</Pill>
					</div>
					<div className={styles.dot_circle}>
						<div className={styles.circle1}><div className={styles.port_code}>{originSchedule}</div></div>
						<div className={styles.line} />
						<div className={styles.circle2}>
							<div className={styles.port_code}>{destinationSchedule}</div>
						</div>
					</div>
					<div className={styles.dates_container}>
						<div className={styles.date_container}>
							{formatDate({
								date       : schedule?.departure,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>
						<div className={styles.date_container}>
							{formatDate({
								date       : schedule?.arrival,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>
					</div>
				</div>

				{legs?.length > GLOBAL_CONSTANTS.zeroth_index && (legs || []).map((leg) => (
					<div className={styles.leg_container} key={leg?.id}>
						<div className={styles.line_seperator} />
						<LegsItem legItem={leg} />
					</div>
				))}
			</Modal.Body>
		</Modal>
	);
}
