import { cl, Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import getMappingObject from '../../../../../../config/milestone-card-mapping';

import Stepper from './Stepper';
import styles from './styles.module.css';

const INVALID_VESSEL_NAME = ['N/A'];
const THOUSAND = 1000;
const WIDTH_PROP = {
	VESSEL : 35,
	TRUCK  : 55,
	RAIL   : 55,
};

const getIconUrl = ({ mapping, type, transportMode }) => {
	const obj = {
		air     : mapping[type],
		ocean   : mapping[transportMode] || GLOBAL_CONSTANTS.image_url.ship_icon,
		surface : GLOBAL_CONSTANTS.image_url.truck_icon,
	};
	return obj[type];
};

function MilestoneName({
	status = '',
	vessel_name = '', last_location = '',
	distance_remained = 0, truck_number = '',
}) {
	return 	(
		<>
			{status}
			{last_location}

			{' '}
			<p>
				Distance
				{' '}
				{Math.ceil(distance_remained / THOUSAND)}
				km
			</p>

			<p>
				Truck Number
				{' '}
				{truck_number}
			</p>

			{vessel_name && !INVALID_VESSEL_NAME.includes(vessel_name) ? (
				<Tooltip
					content={vessel_name}
					placement="right"
				>
					<IcMInfo className={styles.info_icon} />
				</Tooltip>
			) : null}
		</>
	);
}

function Card({
	combineList = [], trackingType = 'ocean', isCurrentMilestone = false,
	milestoneSubIndex = 0, truck_number = '',
}) {
	const {
		location = '', station = '',
		transport_mode = 'VESSEL',
	} =	combineList?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const combineListLength = combineList.length;

	const GET_MAPPING = getMappingObject();

	const { MILESTONE_ICON } = GET_MAPPING[trackingType];

	const url = getIconUrl({ mapping: MILESTONE_ICON, type: trackingType, transportMode: transport_mode });

	return (
		<div className={cl`${styles.container} ${isCurrentMilestone ? styles.current_milestone_box : ''}`}>
			<div className={cl`${styles.flex_box} ${styles.heading_container}`}>
				<h3 className={styles.title}>{location || station}</h3>
				<Image
					src={url}
					width={WIDTH_PROP?.[transport_mode]}
					height={35}
					alt="logo"
				/>
			</div>

			<div className={styles.info}>
				{combineList.map((item, index) => {
					const {
						id = '',
						status = '',
						vessel_name = '',
						last_location = '',
						distance_remained = '',
						tracking_updated_at = '',
					} = item || {};
					const isLastRow = index === combineListLength - GLOBAL_CONSTANTS.one;
					const currSubMilestone = isCurrentMilestone && milestoneSubIndex === index;

					const date = formatDate({
						date       : tracking_updated_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					});

					const day = formatDate({
						date       : tracking_updated_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date.eee,
						formatType : 'date',
					});

					const time = formatDate({
						date       : tracking_updated_at,
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'time',
					});

					return (
						<div
							key={id}
							className={cl`${styles.flex_box} ${styles.row}
							${!isLastRow ? styles.not_last_row : ''}
							${isCurrentMilestone ? styles.current_milestone : ''}`}
						>
							<div className={styles.date}>
								<div>{date}</div>
								<div className={styles.day}>
									(
									{day}
									)
								</div>
							</div>

							{isCurrentMilestone ? (
								<Stepper
									index={index}
									isLastRow={isLastRow}
									milestoneSubIndex={milestoneSubIndex}
								/>
							) : null}

							<div className={cl`${styles.milestone} ${currSubMilestone ? styles.curr_info : ''}`}>
								{currSubMilestone ? (
									<Pill color="orange">
										<MilestoneName
											status={status}
											vessel_name={vessel_name}
											last_location={last_location}
											distance_remained={distance_remained}
											truck_number={truck_number}
											tracking_updated_at={tracking_updated_at}
										/>
									</Pill>
								) : (
									<MilestoneName
										status={status}
										vessel_name={vessel_name}
										last_location={last_location}
										distance_remained={distance_remained}
										truck_number={truck_number}
									/>
								)}
							</div>

							<div className={styles.time}>{time}</div>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default Card;
