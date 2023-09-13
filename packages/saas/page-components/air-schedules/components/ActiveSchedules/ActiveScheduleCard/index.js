import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowNext } from '@cogoport/icons-react';
import { differenceInDays } from '@cogoport/utils';
import React, { useState } from 'react';

import { SchedulesModal } from './SchedulesModal';
import styles from './styles.module.css';

function ActiveScheduleCard({ scheduleDetails = {}, schedule = {} }) {
	const originSchedule = scheduleDetails?.origin_airport?.port_code || 'Origin';
	const destinationSchedule = scheduleDetails?.destination_airport?.port_code || 'Destination';
	const airLinesList = scheduleDetails?.schedules?.airlines || [];

	const shippingLine = airLinesList.filter(
		(item) => item.id === schedule.airline_id,
	)[GLOBAL_CONSTANTS.zeroth_index] || {};

	const [openSchedulesModal, setOpenSchedulesModal] = useState(false);
	return (
		<div className={styles.container}>
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
						<span className="span">
							{schedule?.vessel_name || schedule?.transport_name}
							/
							{schedule?.voyage_number}
							(
							SERVICE
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
				<div className={styles.main_pill_container}>
					<Pill size="md" color="#FEF3E9">
						{differenceInDays(new Date(schedule?.arrival), new Date(schedule?.departure))}
						Days
					</Pill>
				</div>
				<div className={styles.steps_container}>
					<div className={styles.dot_circle}>
						<div className={styles.circle1}>
							<div className={styles.port_code}>{originSchedule}</div>
						</div>
						<div className={styles.line} />
						<div className={styles.circle2}>
							<div className={styles.port_code}>{destinationSchedule}</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={styles.footer_container}
				role="presentation"
				onClick={() => { setOpenSchedulesModal(true); }}
			>
				View Details
				<IcMArrowNext width="1.2rem" height="1.2rem" />
			</div>
			{openSchedulesModal && (
				<SchedulesModal
					openSchedulesModal={openSchedulesModal}
					setOpenSchedulesModal={setOpenSchedulesModal}
					shippingLine={shippingLine}
					schedule={schedule}
					scheduleDetails={scheduleDetails}
				/>
			)}
		</div>
	);
}

export default ActiveScheduleCard;
