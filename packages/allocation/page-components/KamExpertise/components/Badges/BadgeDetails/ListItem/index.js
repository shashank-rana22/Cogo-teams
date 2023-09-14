import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../../../common/EmptyState';

import BadgeListItem from './BadgeListItem';
import BadgeLoading from './BadgesLoading';
import MasteryListItem from './MasteryListItem';
import styles from './styles.module.css';

function ListItem(props) {
	const { t } = useTranslation(['allocation']);
	const {
		setBadgeItemData,
		setMasteryItemData,
		setToggleScreen,
		loading,
		listRefetch,
		badgeList,
	} = props;

	if (loading) {
		return (
			<BadgeLoading />
		);
	}

	if (isEmpty(badgeList)) {
		return (
			<div className={styles.empty_state_container}>
				<EmptyState
					height="250px"
					width="400px"
					flexDirection="column"
					emptyText={t('allocation:badges_not_found_empty_label')}
					textSize="20px"
				/>
			</div>
		);
	}

	return (
		<div>
			{badgeList.map(
				(data, index) => (data?.expertise_configuration_type === 'badge_configuration' ? (
					<MasteryListItem
						key={data?.badge_name}
						data={data}
						index={index}
						setToggleScreen={setToggleScreen}
						setMasteryItemData={setMasteryItemData}
					/>
				) : (
					<BadgeListItem
						key={data?.badge_name}
						data={data}
						index={index}
						setToggleScreen={setToggleScreen}
						setBadgeItemData={setBadgeItemData}
						listRefetch={listRefetch}
					/>
				)),
			)}
		</div>
	);
}
export default ListItem;
