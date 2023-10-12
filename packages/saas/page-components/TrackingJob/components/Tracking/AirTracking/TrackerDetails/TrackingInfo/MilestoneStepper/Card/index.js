import { cl, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';

import getMappingObject from '../../../../../../../config/milestone-card-mapping';
import MilestoneName from '../../../MileStoneName/MileStoneName';

import Stepper from './Stepper';
import styles from './styles.module.css';

const WIDTH_PROP = {
	VESSEL : 35,
	TRUCK  : 55,
	RAIL   : 55,
};

const getIconUrl = ({ mapping, type, transportMode }) => {
	const obj = {
		air   : mapping.AIR,
		ocean : mapping[transportMode] || GLOBAL_CONSTANTS.image_url.ship_icon,
	};
	return obj[type];
};

function Card({
	combineList = [], trackingType = 'ocean', isCurrentMilestone = false,
	milestoneSubIndex,
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
				{combineList?.map((item, index) => {
					const {
						id = '',
						event_date = '',
						actual_date = '',
					} = item || {};

					const isLastRow = index === combineListLength - GLOBAL_CONSTANTS.one;
					const currSubMilestone = isCurrentMilestone && milestoneSubIndex === index;

					const date = formatDate({
						date       : event_date || actual_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					});

					const day = formatDate({
						date       : event_date || actual_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date.eee,
						formatType : 'date',
					});

					const time = formatDate({
						date       : event_date || actual_date,
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
										<MilestoneName item={item} />
									</Pill>
								) : (
									<MilestoneName item={item} />
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
