import React, { useState } from 'react';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import {
	StyledContainer,
	Dot,
	HorizontalLine,
	Milestones,
	Milestone,
	HeaderContainer,
	Icon,
} from './styles';
import { Rest, Station, Time } from '../../AirTracking/MilestoneData/styles';
import DeleteModal from './MilestoneDeleteModal';
import EditModal from './MilestoneEditModal';

const MilestoneDetail = ({
	data,
	containerSubscriptionId,
	getMilestones,
	refetch,
	showUpdate,
	setShowUpdate,
	isDisabled,
	shipping_line_id = '',
}) => {
	const [deleteModal, setDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState({});
	const [editDetail, setEditDetail] = useState({});
	const [editModal, setEditModal] = useState(false);
	const handleDeleteModal = (id) => {
		setDeleteModal(!deleteModal);
		setDeleteId(id);
	};
	const handleEditModal = (val) => {
		setEditDetail(val);
		setEditModal(!editModal);
	};

	const newData = () => {
		return (
			<Milestones>
				{(data || []).map((val, index) => (
					<Milestone>
						<Dot />
						{data.length !== index + 1 && <HorizontalLine />}
						<StyledContainer>
							<HeaderContainer>
								<Station>{val?.location}</Station>
								<Icon>
									<IcMDelete onClick={() => handleDeleteModal(val?.id)} />
									<IcMEdit onClick={() => handleEditModal(val)} />
								</Icon>
							</HeaderContainer>
							<Time>
								{formatDate({
									date: val.event_date,
									dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									timeFormat: GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
									formatType: 'dateTime',
									separator: ' ',
								})}{' '}
								- {val.milestone}
							</Time>
							<Rest>
								<div>Transport Mode: {val?.transport_mode}</div>
								<div>Vessel Name: {val?.vessel_name}</div>
							</Rest>
						</StyledContainer>
					</Milestone>
				))}
				{deleteModal && (
					<DeleteModal
						getMilestones={getMilestones}
						deleteModal={deleteModal}
						setDeleteModal={setDeleteModal}
						deleteId={deleteId}
						containerSubscriptionId={containerSubscriptionId}
					/>
				)}
				{editModal && (
					<EditModal
						getMilestones={getMilestones}
						editModal={editModal}
						setEditModal={setEditModal}
						refetch={refetch}
						showUpdate={showUpdate}
						setShowUpdate={setShowUpdate}
						isDisabled={isDisabled}
						editDetail={editDetail}
						shipping_line_id={shipping_line_id}
					/>
				)}
			</Milestones>
		);
	};

	return <>{newData()}</>;
};
export default MilestoneDetail;
