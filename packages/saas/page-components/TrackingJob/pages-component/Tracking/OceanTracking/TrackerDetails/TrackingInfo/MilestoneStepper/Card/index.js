import { cl, Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMEdit, IcMInfo } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import getMappingObject from '../../../../../../../config/milestone-card-mapping';
import DeleteModal from '../../MilestoneDeleteModal';
import EditModal from '../../MilestoneEditModal';

import Stepper from './Stepper';
import styles from './styles.module.css';

const INVALID_VESSEL_NAME = ['N/A'];
const THIRTY_FIVE = 35;
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

function MilestoneName({ milestone = '', vessel_name = '' }) {
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
	milestoneSubIndex = null, refetch = () => {},
}) {
	const {
		location = '', station = '',
		transport_mode = 'VESSEL',
	} =	combineList?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const combineListLength = combineList.length;
	const GET_MAPPING = getMappingObject();

	const { MILESTONE_ICON } = GET_MAPPING[trackingType];

	const url = getIconUrl({ mapping: MILESTONE_ICON, type: trackingType, transportMode: transport_mode });
	const [deleteModal, setDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState({});
	const [editDetail, setEditDetail] = useState({});
	const [editModal, setEditModal] = useState(false);
	const handleDeleteModal = (id) => {
		setDeleteModal(!deleteModal);
		setDeleteId(id);
	};
	const handleEditModal = (item) => {
		setEditDetail(item);
		setEditModal(!editModal);
	};
	return (
		<div className={cl`${styles.container} ${isCurrentMilestone ? styles.current_milestone_box : ''}`}>
			<div className={cl`${styles.flex_box} ${styles.heading_container}`}>
				<h3 className={styles.title}>{location || station}</h3>
				<Image
					src={url}
					width={WIDTH_PROP?.[transport_mode] || THIRTY_FIVE}
					height={35}
					alt="logo"
				/>
			</div>

			<div className={styles.info}>
				{combineList?.map((item, index) => {
					const { id = '', milestone, event_date = '', vessel_name = '' } = item || {};
					const isLastRow = index === combineListLength - GLOBAL_CONSTANTS.one;
					const currSubMilestone = isCurrentMilestone && milestoneSubIndex === index;

					const date = formatDate({
						date       : event_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					});

					const day = formatDate({
						date       : event_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date.eee,
						formatType : 'date',
					});

					const time = formatDate({
						date       : event_date,
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
							<div className={styles.icon}>
								<IcMDelete onClick={() => handleDeleteModal(item?.id)} />
								<IcMEdit onClick={() => handleEditModal(item)} />
							</div>

						</div>
					);
				})}

			</div>
			{deleteModal && (
				<DeleteModal
					deleteModal={deleteModal}
					setDeleteModal={setDeleteModal}
					deleteId={deleteId}
					refetch={refetch}
				/>

			)}

			{editModal && (
				<EditModal
					editModal={editModal}
					setEditModal={setEditModal}
					refetch={refetch}
					editDetail={editDetail}
				/>
			)}
		</div>
	);
}

export default Card;
