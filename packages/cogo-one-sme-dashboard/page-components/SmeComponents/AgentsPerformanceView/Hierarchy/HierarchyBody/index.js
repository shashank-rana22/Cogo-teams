import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
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
};

function HierarchyBody({
	hierarchyData = [],
	setHierarchyData = () => {},
}) {
	const currentView = isEmpty(hierarchyData) ? ''
		: hierarchyData?.[hierarchyData.length - 1]?.hierarchyDataType;

	const nextViewType = NEXT_DATA_VIEW_TYPE?.[currentView] || 'partners';
	console.log('nextViewType:', hierarchyData, currentView, 'dd', nextViewType);

	const { partnersList = [], partnersLoading = false } = useListPartners({ nextViewType });

	const { leaderBoardData = {}, leaderBoardLoading = false } = useGetLeaderbordList({
		partnerId        : hierarchyData?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
		officeLocationId : hierarchyData?.[1]?.hierarchyDataType === 'branches' ? hierarchyData?.[1]?.id : '',
	});

	const {
		userHierarchyLoading = false,
		userHierarchyData = {},
	} = useOrganizationRMMapping({
		partnerId : '',
		userId    : '',
	});

	const userOptions = getOptions({
		hierarchyData,
		nextViewType,
		partnersList,
		leaderBoardData,
		loading: leaderBoardLoading || userHierarchyLoading,
	});
	console.log('loading', userHierarchyLoading || partnersLoading || leaderBoardLoading);
	return (
		<div
			className={styles.container}
			style={{ alignItems: isEmpty(hierarchyData) ? 'center' : 'flex-start' }}
		>
			<div className={cl`${styles.prev_selected} 
				${isEmpty(hierarchyData) ? styles.no_container : styles.border_bottom_required}`}
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
							<div className={styles.hierarchy_data_view} />
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

			{(userHierarchyLoading || partnersLoading || leaderBoardLoading)
				? <LoadingState />
				: null}
		</div>
	);
}

export default HierarchyBody;
