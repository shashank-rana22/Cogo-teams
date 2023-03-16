import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';

import BadgeListItem from './BadgeListItem';
import MasteryListItem from './MasteryListItem';
import styles from './styles.module.css';

function ListItem(props) {
	const {
		setBadgeListData,
		setMasteryListData,
		setToggleScreen,
		loading,
		listRefetch,
		badgeList,
	} = props;

	if (loading) {
		return (
			<div className={styles.placeholder_container}>
				<div className={styles.number_tag}>
					<Placeholder width="100px" height="20px" />
					<Placeholder width="80px" height="28px" />
				</div>

				<div className={styles.main_card}>
					<div className={styles.card_description}>
						<div>
							<Placeholder width="180px" height="20px" />
						</div>

						<div style={{ marginTop: '12px' }}>
							<Placeholder width="180px" height="20px" />
						</div>

						<div className={styles.modified}>
							<Placeholder width="236px" height="20px" />
							<Placeholder width="236px" height="20px" />
						</div>
					</div>

					<div className={styles.score_container}>
						<Placeholder width="120px" height="24px" />
						<div className={styles.score_badge}>
							{[1, 2, 3].map((skeletonItem) => (
								<Placeholder
									key={skeletonItem}
									height="120px"
									width="220px"
									style={{ marginRight: '20px', marginTop: '20px' }}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (isEmpty(badgeList)) {
		return (
			<div
				style={{
					padding         : '48px 0',
					backgroundColor : '#fff',
					marginBottom    : '12px',
				}}
			>
				<EmptyState
					height="400px"
					width="600px"
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
				(data, index) => (data.expertise_configuration_type === 'badge_configuration' ? (
					<MasteryListItem
						data={data}
						index={index}
						setToggleScreen={setToggleScreen}
						setMasteryListData={setMasteryListData}
					/>
				) : (
					<BadgeListItem
						data={data}
						index={index}
						setToggleScreen={setToggleScreen}
						setBadgeListData={setBadgeListData}
						listRefetch={listRefetch}
					/>
				)),
			)}
		</div>
	);
}
export default ListItem;
