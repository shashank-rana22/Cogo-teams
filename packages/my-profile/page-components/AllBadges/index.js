import { Placeholder, Tooltip } from '@cogoport/components';
import { IcCStar, IcMArrowLeft } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import useGetAllocationKamExpertiseProfile from '../hooks/useGetAllocationKamExpertiseProfile';

import BadgeDescription from './BadgeDescription';
import Header from './Header';
import styles from './styles.module.css';

function StarCollection() {
	return (
		<div className={styles.stars_container}>
			<IcCStar width={24} stroke="#FFDF33" />
			<IcCStar width={24} stroke="#FFDF33" />
			<IcCStar width={24} stroke="#FFDF33" />
		</div>
	);
}

function AllBadges() {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner || {};

	const {
		badgeList,
	} = useGetAllocationKamExpertiseProfile(partner_user_id);

	const { badges_got = [], badges_not_got = [] } = badgeList || {};

	const router = useRouter();
	const showProfile = () => {
		router.push('/my-profile');
	};

	const [modalDetail, setModalDetail] = useState('0');

	const showBadgeDetails = (item) => {
		setModalDetail(item.id);
	};

	const showAllBadges = () => {
		setModalDetail('0');
	};

	return (
		<div className={styles.main_container_wrapper}>

			<Header
				modalDetail={modalDetail}
				showProfile={showProfile}
				showAllBadges={showAllBadges}
			/>

			{
				modalDetail === '0'
				&& !isEmpty(badgeList)
					? (
						<div className={styles.badge_list_container}>
							<p className={styles.heading}>Badges List</p>
							<div className={styles.badges_container}>
								{
									badges_got?.map((item) => (
										<Tooltip content={item.medal}>
											<div
												key={item.id}
												className={styles.container}
												role="presentation"
												style={{ cursor: 'pointer' }}
												onClick={() => showBadgeDetails(item)}
											>
												<div className={styles.image_container}>
													<img className={styles.badge} src={item.image_url} alt="" />
												</div>
												<StarCollection />
											</div>
										</Tooltip>
									))
								}
								{
									badges_not_got?.map((item) => (
										<Tooltip content={item.medal}>
											<div
												key={item.id}
												style={{ pointerEvents: 'none', opacity: 0.2 }}
												className={styles.container}
												role="presentation"
												onClick={() => showBadgeDetails(item)}
											>
												<div className={styles.image_container}>
													<img className={styles.badge} src={item.image_url} alt="" />
												</div>
												<StarCollection />
											</div>
										</Tooltip>
									))
								}
							</div>
						</div>
					)
					: (modalDetail === '0'
						&& (
							<div style={{ }}>
								<EmptyState
									height={250}
									width={450}
									flexDirection="column"
									emptyText="Badges not found"
								/>
							</div>
						)
					)
			}

			{
                modalDetail !== '0'
                && <BadgeDescription setModalDetail={setModalDetail} />
            }

		</div>
	);
}

export default AllBadges;
