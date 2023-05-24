import { Breadcrumb } from '@cogoport/components';

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
		locale,
		partner_id,
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
			<Breadcrumb className={styles.breadcrumb}>
				<Breadcrumb.Item
					label={<a href={`/v2/${locale}/${partner_id}/allocation/kam-expertise/`}>Dashboard</a>}
				/>

				{ (toggleScreen === BADGE_DETAILS) && <Breadcrumb.Item label={<b>All Badges</b>} />}

				{ (toggleScreen !== BADGE_DETAILS)
					&& (
						<Breadcrumb.Item
							label={(
								<a href={`/v2/${locale}/${partner_id}/allocation/kam-expertise/view-badges`}>
									All Badges
								</a>
							)}
						/>
					)}

				{ (toggleScreen === CREATE_BADGE)
					&& <Breadcrumb.Item label={<b>Add Badge</b>} />}

				{ (toggleScreen === CREATE_MASTERY)
					&& <Breadcrumb.Item label={<b>Add Mastery</b>} />}
			</Breadcrumb>

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
