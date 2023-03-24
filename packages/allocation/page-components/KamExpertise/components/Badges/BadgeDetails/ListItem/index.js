import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';

import BadgeListItem from './BadgeListItem';
import BadgeLoading from './BadgesLoading';
import MasteryListItem from './MasteryListItem';
import styles from './styles.module.css';

function ListItem(props) {
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
					emptyText="Badges not Found"
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
						data={data}
						index={index}
						setToggleScreen={setToggleScreen}
						setMasteryItemData={setMasteryItemData}
					/>
				) : (
					<BadgeListItem
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
