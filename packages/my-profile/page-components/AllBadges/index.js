import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetAllocationKamExpertiseProfile from '../../hooks/useGetAllocationKamExpertiseProfile';
import useGetBadgeDescription from '../../hooks/useGetBadgeDescription';

import BadgeDescription from './BadgeDescription';
import BadgeList from './BadgeList';
import Header from './Header';
import MasteryDescription from './MasteryDescription';
import styles from './styles.module.css';

function AllBadges() {
	const [modalDetail, setModalDetail] = useState('');

	const router = useRouter();

	const { query = {} } = router;

	const { user_id = '', path: returnPath = '' } = query;

	const {
		listLoading,
		userBadges,
	} = useGetAllocationKamExpertiseProfile(user_id);

	const {
		badgeDetail = {},
		badgeDetailloading = false,
		setBadgeParams = () => {},
	} = useGetBadgeDescription();

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
				setModalDetail={setModalDetail}
				returnPath={returnPath}
			/>

			{
				isEmpty(modalDetail)
				&& (
					<BadgeList
						listLoading={listLoading}
						userBadges={userBadges}
						showBadgeDetails={showBadgeDetails}
					/>
				)
			}

			{
                  !isEmpty(modalDetail) && badgeDetail?.badge_type === 'mastery'
				&& <MasteryDescription badgeDetailloading={badgeDetailloading} badgeDetail={badgeDetail} />
            }

			{
                  !isEmpty(modalDetail) && badgeDetail?.badge_type === 'badge'
				&& <BadgeDescription badgeDetailloading={badgeDetailloading} badgeDetail={badgeDetail} />
            }
		</div>
	);
}

export default AllBadges;
