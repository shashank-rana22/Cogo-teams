import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
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

	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner || {};

	const router = useRouter();

	const showProfile = () => {
		router.push('/my-profile');
	};

	const {
		listLoading,
		badgeList,
	} = useGetAllocationKamExpertiseProfile(partner_user_id);

	const {
		badgeDetail, badgeDetailloading, setBadgeParams,
	} = useGetBadgeDescription();

	const showAllBadges = () => {
		setModalDetail();
	};

	const showBadgeDetails = (badge) => {
		setModalDetail(badge.id);

		setBadgeParams({
			partner_user_id,
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
