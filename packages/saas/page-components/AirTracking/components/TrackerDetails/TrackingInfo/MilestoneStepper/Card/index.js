import { cl, Tooltip, Pill } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'react-i18next';

import getMappingObject from '../../../../../constant/card';

import Stepper from './Stepper';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const INVALID_VESSEL_NAME = ['N/A'];

const widthProp = {
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

function MilestoneName({ milestone, vessel_name }) {
	return 	(
		<>
			{milestone}
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
	milestoneSubIndex,
}) {
	const {
		location = '', station = '',
		transport_mode = 'VESSEL',
	} =	combineList?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const combineListLength = combineList.length;

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const GET_MAPPING = getMappingObject({ t });

	const { MILESTONE_ICON } = GET_MAPPING[trackingType];

	const url = getIconUrl({ mapping: MILESTONE_ICON, type: trackingType, transportMode: transport_mode });

	return (
		<div className={cl`${styles.container} ${isCurrentMilestone ? styles.current_milestone_box : ''}`}>
			<div className={cl`${styles.flex_box} ${styles.heading_container}`}>
				<h3 className={styles.title}>{location || station}</h3>
				<Image
					src={url}
					width={widthProp?.[transport_mode] || 35}
					height={35}
					alt="logo"
				/>
			</div>

			<div className={styles.info}>
				{combineList.map((item, index) => {
					const { id = '', milestone, event_date = '', actual_date = '', vessel_name = '' } = item || {};
					const isLastRow = index === combineListLength - 1;
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
										<MilestoneName milestone={milestone} vessel_name={vessel_name} />
									</Pill>
								) : (
									<MilestoneName milestone={milestone} vessel_name={vessel_name} />
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
