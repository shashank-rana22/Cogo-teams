import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { LoadingState } from '../../../../../common/Elements';
import useGetLeaderbordList from '../../../../../hooks/useGetLeaderbordList';
import useListPartners from '../../../../../hooks/useListPartners';
import useOrganizationRMMapping from '../../../../../hooks/useOrganizationRMMapping';

import getOptions from './getOptions';
import styles from './styles.module.css';
import UserCard from './UserCard';

const NEXT_DATA_VIEW_TYPE = {
	partners : 'branches',
	branches : 'managers',
	managers : 'users',
	users    : 'users',
};

function HierarchyBody({
	hierarchyData = [],
	setHierarchyData = () => {},
}) {
	const indiaEntityId = GLOBAL_CONSTANTS.country_entity_ids.IN;
	const selectedPartnerId = hierarchyData?.[GLOBAL_CONSTANTS.zeroth_index]?.id || '';

	const currentView = isEmpty(hierarchyData) ? ''
		: hierarchyData?.[hierarchyData.length - 1]?.hierarchyDataType;

	const nextViewType = (selectedPartnerId !== indiaEntityId && currentView === 'partners')
		? 'managers' : NEXT_DATA_VIEW_TYPE?.[currentView] || 'partners';

	const { partnersList = [], partnersLoading = false } = useListPartners({ nextViewType });

	const { leaderBoardData = {}, leaderBoardLoading = false } = useGetLeaderbordList({
		partnerId        : selectedPartnerId,
		officeLocationId : hierarchyData?.[1]?.hierarchyDataType === 'branches' ? hierarchyData?.[1]?.id : '',
		nextViewType,
	});

	const {
		userHierarchyLoading = false,
		userHierarchyData = {},
	} = useOrganizationRMMapping({
		partnerId : selectedPartnerId,
		userId    : hierarchyData?.[(hierarchyData?.length || 0) - 1]?.id,
		nextViewType,
	});

	const showLoading = (userHierarchyLoading || partnersLoading || leaderBoardLoading);

	const userOptions = getOptions({
		hierarchyData,
		nextViewType,
		partnersList,
		leaderBoardData,
		userHierarchyData,
		loading: showLoading,
	});

	return (
		<div
			className={styles.container}
			style={{ alignItems: isEmpty(hierarchyData) ? 'center' : 'flex-start' }}
		>
			<div className={cl`${styles.prev_selected} 
				${isEmpty(hierarchyData) ? styles.no_container : ''} 
				${(!isEmpty(hierarchyData) && !isEmpty(userOptions))
				? styles.border_bottom_required : ''}`}
			>
				{hierarchyData?.map(
					(itm, index) => (
						<>
							<UserCard
								key={itm?.id}
								data={itm}
								cardIndex={index}
								hierarchyData={hierarchyData}
								setHierarchyData={setHierarchyData}
								cardType="shortForm"
								isLastIndex={index === ((hierarchyData?.length || 0) - 1)}
							/>
							{(isEmpty(userOptions) && index === (hierarchyData?.length || 0) - 1)
								? null : <div className={styles.hierarchy_data_view} />}
						</>
					),
				)}
			</div>

			{userOptions?.map(
				(itm) => (
					<UserCard
						key={itm?.id}
						data={itm}
						setHierarchyData={setHierarchyData}
						nextViewType={nextViewType}
					/>
				),
			)}

			{showLoading
				? <LoadingState />
				: null}
		</div>
	);
}

export default HierarchyBody;
