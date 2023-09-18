import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals';
import formatDate from '@cogo/globalization/utils/formatDate';
import React from 'react';

import EmptyState from '../../../../commons/EmptyState';
import LoadingState from '../../../../commons/Loader';
import useGetAirMilestones from '../../../../hooks/useGetAirMilestones';

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

function PriceDetail({ id }) {
	const { milestoneData = [], loading } = useGetAirMilestones({ id });

	const newData = () => (
		<Milestones>
			{milestoneData.map((val, index) => (
				<Milestone>
					<Dot />
					{milestoneData.length !== index + 1 && <HorizontalLine />}
					<StyledContainer>
						<Station>{val.station}</Station>
						<Time>
							{formatDate({
								date       : val.actual_date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : ' ',
							})}
							{' '}
							-
							{' '}
							{val.milestone}
						</Time>
						<Rest>
							<div>
								Piece:
								{val.piece}
							</div>
							<div>
								Flight Number:
								{val.flight_number}
							</div>
						</Rest>
					</StyledContainer>
				</Milestone>
			))}
		</Milestones>
	);

	if (loading) return <LoadingState />;

	if (milestoneData?.length === 0) return <EmptyState />;

	return <>{newData()}</>;
}
export default PriceDetail;
