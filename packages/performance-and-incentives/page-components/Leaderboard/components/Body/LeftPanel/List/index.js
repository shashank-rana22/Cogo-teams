import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../../common/LoadingState';
import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../constants/leaderboard-reporttype-constants';

import getListColumnMapping from './get-list-column-mapping';
import ListItem from './ListItem';
import styles from './styles.module.css';

const DOTS = 3;

const { ADMIN_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

function List(props) {
	const {
		listLoading, list, viewType, currLevel, setCurrLevel,
		levelStack, setLevelStack, currentUserData, isChannel,
	} = props;

	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const LIST_COLUMN_MAPPING = getListColumnMapping({ levelStack });

	if (listLoading) {
		return <LoadingState />;
	}

	if (!listLoading && isEmpty(list) && isEmpty(currentUserData)) {
		return (
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_customer_card}
				width={350}
				height={400}
				alt="Empty List"
				className={styles.empty_img}
			/>
		);
	}

	return (
		<div className={styles.list_container}>
			<div className={styles.list_header_container}>
				{LIST_COLUMN_MAPPING.map((item) => {
					const { key, Header, flex } = item;

					if (key === 'report_type' && currLevel?.report_type === ADMIN_REPORT) return null;

					if (!Header) return <div />;

					return <div key={key} style={{ flex }}>{Header}</div>;
				})}
			</div>

			<div className={styles.list_body_container}>
				{list.map((listItem) => (
					<ListItem
						key={listItem.id}
						listItem={listItem}
						user={user}
						viewType={viewType}
						currLevel={currLevel}
						setCurrLevel={setCurrLevel}
						isChannel={isChannel}
						levelStack={levelStack}
						setLevelStack={setLevelStack}
						LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
					/>
				))}

				{(!isEmpty(currentUserData) && isEmpty(list.find((item) => item.user?.id === user.id))) ? (
					<>
						<div className={styles.ellipsis_container}>
							{[...Array(DOTS).keys()].map((key) => <span key={key} className={styles.dot}>.</span>)}
						</div>

						<ListItem
							listItem={currentUserData}
							user={user}
							viewType={viewType}
							currLevel={currLevel}
							setCurrLevel={setCurrLevel}
							isChannel={isChannel}
							levelStack={levelStack}
							setLevelStack={setLevelStack}
							LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
						/>
					</>
				) : null}
			</div>
		</div>
	);
}

export default List;
