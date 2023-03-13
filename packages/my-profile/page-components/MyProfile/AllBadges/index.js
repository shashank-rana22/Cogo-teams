import { IcCStar, IcMArrowLeft } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

// import useGetAllocationKamExpertiseProfile from '../hooks/useGetAllocationKamExpertiseProfile';
import useGetAllocationKamExpertiseProfile from '../../hooks/useGetAllocationKamExpertiseProfile';

import BadgeDescription from './BadgeDescription';
import styles from './styles.module.css';

const data = [
	{
		id: '1',
	},
	{
		id: '2',
	},
	{
		id: '3',
	},
	{
		id: '4',
	},
];
function AllBadges() {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner || {}; const {
		loading,
		badgeList,
	} = useGetAllocationKamExpertiseProfile(partner_user_id);

	console.log('badgeList : ', badgeList);

	const { badges_got = {}, badges_not_got = {} } = badgeList;

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

	if (loading) {
		return <>Loading..</>;
	}

	return (
		<div className={styles.main_container_wrapper}>
			<div className={styles.greeting_container}>
				<section>
					<div className={styles.main_heading} role="presentation" onClick={showProfile}>
						<div className={styles.icon_container}>
							<IcMArrowLeft width={24} height={24} />
						</div>
						<span className={styles.span}>My Profile</span>
					</div>
				</section>
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

			{ modalDetail === '0'
			&& (
				<div className={styles.badge_list_container}>
					<p className={styles.heading}>Badges List</p>
					<div className={styles.badges_container}>

						{
                        badges_got.map((item) => (
	<div key={item.id} className={styles.container} role="presentation" onClick={() => showBadgeDetails(item)}>
		<img className={styles.badge} src={item.image_url} alt="" />
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
                        badges_not_got.map((item) => (
	<div key={item.id} className={styles.container} role="presentation" onClick={() => showBadgeDetails(item)}>
		<img className={styles.badge} src={item.image_url} alt="" />
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
			)}
			{
                modalDetail !== '0'
                && <BadgeDescription setModalDetail={setModalDetail} />
            }

		</div>
	);
}

export default AllBadges;
