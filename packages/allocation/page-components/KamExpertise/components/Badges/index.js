import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetBadgeList from '../../hooks/useGetBadgeList';

import BadgeDetails from './BadgeDetails';
import CreateBadge from './CreateBadge';
import CreateMastery from './CreateMastery';
import styles from './styles.module.css';

function Badges() {
	const router = useRouter();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

	const [toggleScreen, setToggleScreen] = useState('badge_details');
	const [badgeListData, setBadgeListData] = useState({});
	const [masteryListData, setMasteryListData] = useState({});

	const {
		loading,
		list: badgeList = {},
		searchValue,
		setSearchValue = () => {},
		expertise,
		setExpertise = () => {},
		debounceQuery,
		paginationData,
		getNextPage = () => {},
		listRefetch,
	} = useGetBadgeList();

	const BADGES_COMPONENTS_MAPPING = {
		badge_details: <BadgeDetails
			badgeList={badgeList}
			setToggleScreen={setToggleScreen}
			expertise={expertise}
			setExpertise={setExpertise}
			searchValue={searchValue}
			setSearchValue={setSearchValue}
			debounceQuery={debounceQuery}
			setMasteryListData={setMasteryListData}
			setBadgeListData={setBadgeListData}
			loading={loading}
			listRefetch={listRefetch}
			paginationData={paginationData}
			getNextPage={getNextPage}
		/>,

		mastery: <CreateMastery
			setToggleScreen={setToggleScreen}
			badgeList={badgeList}
			masteryListData={masteryListData}
			listRefetch={listRefetch}
		/>,

		create_badge: <CreateBadge
			setToggleScreen={setToggleScreen}
			badgeListData={badgeListData}
			listRefetch={listRefetch}
		/>,
	};

	return (
		<section className={styles.main_container}>
			<div
				className={styles.back_container}
				role="presentation"
				onClick={onClickBack}
			>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>

				<div className={styles.back_text}>Back to Dashboard</div>
			</div>

			<section className={styles.container}>
				<div className={styles.heading_container}>Badges</div>
			</section>

			<div>
				{BADGES_COMPONENTS_MAPPING[toggleScreen] || ''}
			</div>

		</section>
	);
}

export default Badges;
