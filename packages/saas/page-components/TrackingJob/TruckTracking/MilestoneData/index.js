import React from 'react';
import formatDate from '@cogo/globalization/utils/formatDate';
import LoadingState from '../../../../commons/Loader';
import EmptyState from '../../../../commons/EmptyState';
import {
	StyledContainer,
	Dot,
	HorizontalLine,
	Milestones,
	Milestone,
	Station,
	Time,
	Rest,
} from './styles';

const MilestoneDetail = ({ milestoneData = [], loading, tripInfo = {} }) => {
	const newData = () => {
		return (
			<Milestones>
				{tripInfo?.intugine_eta ? (
					<Station>
						Expected Arrival Time :
						{formatDate({
							date: tripInfo.intugine_eta,
							formatType: 'dateTime',
							separator: ' ',
						})}
					</Station>
				) : null}
				{milestoneData.map((val = {}, index) => (
					<Milestone>
						<Dot />
						{milestoneData.length !== index + 1 && <HorizontalLine />}
						<StyledContainer>
							<Station>{val.last_location}</Station>
							<Time>
								{formatDate({
									date: val.tracking_updated_at,
									formatType: 'dateTime',
									separator: ' ',
								})}{' '}
								- {tripInfo.status}
							</Time>
							<Rest>
								<div>Truck Number: {tripInfo.truck_number}</div>
							</Rest>
							{val.distance_remained && (
								<Rest>
									<div>
										Distance Remaining:
										{Math.ceil(val.distance_remained / 1000)} km
									</div>
								</Rest>
							)}
						</StyledContainer>
					</Milestone>
				))}
			</Milestones>
		);
	};

	if (loading) return <LoadingState />;

	if (milestoneData?.length === 0 && !loading) return <EmptyState />;

	return newData();
};
export default MilestoneDetail;
