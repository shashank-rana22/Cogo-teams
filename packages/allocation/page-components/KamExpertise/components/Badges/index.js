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

	const [toggleScreen, setToggleScreen] = useState(1);
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
		1: <BadgeDetails
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
		2: <CreateMastery
			setToggleScreen={setToggleScreen}
			badgeList={badgeList}
			masteryListData={masteryListData}
			listRefetch={listRefetch}
		/>,
		3: <CreateBadge
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
