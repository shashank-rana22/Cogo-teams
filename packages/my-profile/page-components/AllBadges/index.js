import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetAllocationKamExpertiseProfile from '../hooks/useGetAllocationKamExpertiseProfile';
import useGetBadgeDescription from '../hooks/useGetBadgeDescription';

import BadgeDescription from './BadgeDescription';
import BadgeList from './BadgeList';
import Header from './Header';
import styles from './styles.module.css';

function AllBadges() {
	const [modalDetail, setModalDetail] = useState();

	const router = useRouter();

	const { query } = router;

	const { user_id = '', path: returnPath = '' } = query;

	const showProfile = () => {
		router.push(returnPath);
	};

	const {
		listLoading,
		badgeList,
	} = useGetAllocationKamExpertiseProfile(user_id);

	const {
		badgeDetail, badgeDetailloading, setBadgeParams,
	} = useGetBadgeDescription();

	const showAllBadges = () => {
		setModalDetail();
	};

	const showBadgeDetails = (badge) => {
		setModalDetail(badge.id);

		setBadgeParams({
			partner_user_id : user_id,
			badge_detail_id : badge.id,
			badge_id        : badge.badge_configuration_id,
		});
	};

	return (
		<div className={styles.main_container_wrapper}>

			<Header
				modalDetail={modalDetail}
				showProfile={showProfile}
				showAllBadges={showAllBadges}
				returnPath={returnPath}
			/>

			{
				isEmpty(modalDetail)
				&& (
					<BadgeList
						listLoading={listLoading}
						badgeList={badgeList}
						showBadgeDetails={showBadgeDetails}
					/>
				)
			}

			{
                !isEmpty(modalDetail)
                && <BadgeDescription badgeDetailloading={badgeDetailloading} badgeDetail={badgeDetail} />
            }

		</div>
	);
}

export default AllBadges;
