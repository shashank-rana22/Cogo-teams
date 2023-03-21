import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import useGetBadgeList from '../../hooks/useGetBadgeList';

import BadgeDetails from './BadgeDetails';
import CreateBadge from './CreateBadge';
import CreateMastery from './CreateMastery';
import styles from './styles.module.css';

const CONSTANT_KEYS = {
	BADGE_DETAILS  : 'badge_details',
	CREATE_MASTERY : 'create_mastery',
	CREATE_BADGE   : 'create_badge',
};

const { BADGE_DETAILS, CREATE_MASTERY, CREATE_BADGE } = CONSTANT_KEYS;

const BADGES_COMPONENTS_MAPPING = {
	[BADGE_DETAILS]  : BadgeDetails,
	[CREATE_MASTERY] : CreateMastery,
	[CREATE_BADGE]   : CreateBadge,
};

function Badges() {
	const router = useRouter();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

	const {
		list: badgeList = [],
		toggleScreen,
		badgeItemData,
		setToggleScreen,
		searchValue,
		setSearchValue,
		debounceQuery,
		setMasteryItemData,
		setBadgeItemData,
		expertise,
		setExpertise,
		loading,
		listRefetch,
		getNextPage,
		paginationData,
		masteryItemData,
	} = useGetBadgeList();

	const componentProps = {
		[BADGE_DETAILS]: {
			badgeList,
			setToggleScreen,
			searchValue,
			setSearchValue,
			debounceQuery,
			setMasteryItemData,
			setBadgeItemData,
			expertise,
			setExpertise,
			loading,
			listRefetch,
			getNextPage,
			paginationData,
		},
		[CREATE_MASTERY]: {
			setToggleScreen,
			masteryItemData,
			listRefetch,
		},
		[CREATE_BADGE]: {
			setToggleScreen,
			badgeItemData,
			listRefetch,
		},
	};

	const Component = BADGES_COMPONENTS_MAPPING[toggleScreen] || null;

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

			{Component && (
				<Component
					key={toggleScreen}
					{...(componentProps[toggleScreen] || {})}
				/>
			)}

		</section>
	);
}

export default Badges;
