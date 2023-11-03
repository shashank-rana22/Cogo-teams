import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import getBranchesData from '../../../../../utils/getBranchesData';

import styles from './styles.module.css';
import UserCard from './UserCard';

const NEXT_DATA_VIEW_TYPE = {
	countries : 'branches',
	// countries : 'countries',
	branches  : 'users',
};

function HierarchyBody({
	loading = false,
	countriesData = [],
	hierarchyData = [],
	setHierarchyData = () => {},
}) {
	if (loading) {
		return (
			<div className={styles.container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.preloader}
					height={250}
					width={250}
					alt="loading"
				/>
			</div>
		);
	}

	const currentView = isEmpty(hierarchyData) ? ''
		: hierarchyData?.[hierarchyData.length - 1]?.hierarchyDataType;

	const nextViewType = NEXT_DATA_VIEW_TYPE?.[currentView] || 'countries';

	if (!nextViewType || nextViewType === 'countries') {
		return (
			<div className={styles.container}>
				{countriesData?.map(
					(itm) => (
						<UserCard
							key={itm?.id}
							data={itm}
							setHierarchyData={setHierarchyData}
						/>
					),
				)}
			</div>
		);
	}

	const branchesData = getBranchesData({ country_id: hierarchyData?.[hierarchyData.length - 1]?.id });

	return (
		<div className={styles.container}>
			<div className={styles.prev_selected}>
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

			{branchesData?.map(
				(itm) => (
					<UserCard
						key={itm?.id}
						data={itm}
						setHierarchyData={setHierarchyData}
					/>
				),
			)}
		</div>
	);
}

export default HierarchyBody;
