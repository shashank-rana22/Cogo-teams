import { Breadcrumb } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['allocation']);

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
					label={(
						<a href={`/v2/${locale}/${partner_id}/allocation/kam-expertise/`}>
							{t('allocation:dashboard_label')}
						</a>
					)}
				/>

				{ (toggleScreen === BADGE_DETAILS) && (
					<Breadcrumb.Item label={(
						<b>
							{t('allocation:all_badges_label')}
						</b>
					)}
					/>
				)}

				{ (toggleScreen !== BADGE_DETAILS)
					&& (
						<Breadcrumb.Item
							label={(
								<a href={`/v2/${locale}/${partner_id}/allocation/kam-expertise/view-badges`}>
									{t('allocation:all_badges_label')}
								</a>
							)}
						/>
					)}

				{ (toggleScreen === CREATE_BADGE)
					&& (
						<Breadcrumb.Item label={(
							<b>
								{t('allocation:add_badge_label')}
							</b>
						)}
						/>
					)}

				{ (toggleScreen === CREATE_MASTERY)
					&& <Breadcrumb.Item label={<b>{t('allocation:add_mastery_label')}</b>} />}
			</Breadcrumb>

			<section className={styles.container}>
				<div className={styles.heading_container}>
					{t('allocation:badges_label')}
				</div>
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
