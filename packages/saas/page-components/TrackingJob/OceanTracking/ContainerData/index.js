import React from 'react';
import { isEmpty } from '@cogoport/front/utils';
import LoadingState from '../../../../commons/Loader';
import { StyledContainer } from './styles';
import MilestoneDetail from '../MilestoneData';
import EmptyState from '../../../../commons/EmptyState';

const PriceDetail = ({
	id,
	refetch,
	showUpdate,
	setShowUpdate,
	isDisabled,
	milestoneData = [],
	loading,
	getMilestones,
	shipping_line_id = '',
}) => {
	const newData = () => {
		return (
			<>
				{milestoneData.map((val, index) => (
					<StyledContainer>
						<div>Container {index + 1}</div>
						<div>Container No. {val?.container_no}</div>
						<MilestoneDetail
							getMilestones={getMilestones}
							data={val?.tracking_data}
							containerSubscriptionId={id}
							refetch={refetch}
							showUpdate={showUpdate}
							setShowUpdate={setShowUpdate}
							isDisabled={isDisabled}
							shipping_line_id={shipping_line_id}
						/>
					</StyledContainer>
				))}
			</>
		);
	};

	if (loading) {
		return <LoadingState />;
	}

	if (isEmpty(milestoneData[0]?.tracking_data) || milestoneData.length === 0) {
		return <EmptyState />;
	}

	return <>{newData()}</>;
};
export default PriceDetail;
