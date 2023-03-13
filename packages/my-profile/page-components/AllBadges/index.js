import { IcCStar, IcMArrowLeft } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import useGetAllocationKamExpertiseProfile from '../hooks/useGetAllocationKamExpertiseProfile';

import BadgeDescription from './BadgeDescription';
import styles from './styles.module.css';

function AllBadges() {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner || {};

	const {
		loading = false,
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

	// Todo: add loading state

	if (loading) {
		return null;
	}

	return (
		<div className={styles.main_container_wrapper}>
			<div className={styles.greeting_container}>
				<div className={styles.main_heading} role="presentation" onClick={showProfile}>
					<div className={styles.icon_container}>
						<IcMArrowLeft width={24} height={24} />
					</div>
					<span className={styles.span}>My Profile</span>
				</div>
				{ modalDetail !== '0'
					&& (
						<div className={styles.main_heading} role="presentation" onClick={showAllBadges}>
							<div className={styles.icon_container}>
								<IcMArrowLeft width={24} height={24} />
							</div>
							<span className={styles.span}>All Badges</span>
						</div>
					)}
			</div>

			{
				modalDetail === '0'
				&& !isEmpty(badgeList)
					? (
						<div className={styles.badge_list_container}>
							<p className={styles.heading}>Badges List</p>
							<div className={styles.badges_container}>

								{
							badges_got?.map((item) => (
								<div
									key={item.id}
									className={styles.container}
									role="presentation"
									onClick={() => showBadgeDetails(item)}
								>
									<div className={styles.image_container}>
										<img className={styles.badge} src={item.image_url} alt="" />
									</div>
									<div className={styles.stars_container}>
										<IcCStar width={24} stroke="#FFDF33" />
										<IcCStar width={24} stroke="#FFDF33" />
										<IcCStar width={24} stroke="#FFDF33" />
									</div>
								</div>
							))
						}
							</div>
							<div className={styles.badges_container}>

								{
							badges_not_got?.map((item) => (
								<div
									key={item.id}
									style={{ pointerEvents: 'none', opacity: 0.4 }}
									className={styles.container}
									role="presentation"
									onClick={() => showBadgeDetails(item)}
								>
									<div className={styles.image_container}>
										<img className={styles.badge} src={item.image_url} alt="" />
									</div>
									<div className={styles.stars_container}>
										<IcCStar width={24} stroke="#FFDF33" />
										<IcCStar width={24} stroke="#FFDF33" />
										<IcCStar width={24} stroke="#FFDF33" />
									</div>
								</div>
							))
						}
							</div>
						</div>
					)
					: (
						<div style={{ }}>
							<EmptyState
								height={250}
								width={450}
								flexDirection="column"
								emptyText="Badges not found"
							/>
						</div>
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
