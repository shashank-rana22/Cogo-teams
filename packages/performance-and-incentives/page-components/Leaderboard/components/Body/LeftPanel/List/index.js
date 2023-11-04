import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../../common/LoadingState';
import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../constants/leaderboard-viewtype-constants';

import getListColumnMapping from './get-list-column-mapping';
import ListItem from './ListItem';
import styles from './styles.module.css';

const { ADMIN, OWNER } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const { ADMIN_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getListItem = ({ viewType, currLevel, userPosition, listItem, index, currentUserData }) => {
	if ([ADMIN, OWNER].includes(viewType) || !isEmpty(currLevel.user) || currLevel.isExpanded) return listItem;

	if (userPosition >= 10 && index === 6) return currentUserData;

	return listItem;
};

const getList = ({ list = [], viewType, currLevel }) => {
	if ([ADMIN, OWNER].includes(viewType) || !isEmpty(currLevel.user) || currLevel.isExpanded) return list;

	return list.slice(0, 10) || [];
};

function List(props) {
	const {
		listLoading, list, viewType, currLevel, setCurrLevel,
		levelStack, setLevelStack, currentUserData, isChannel,
		userPosition,
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
				{getList({ list, viewType, currLevel }).map((listItem, index) => {
					const item = getListItem({
						viewType,
						currLevel,
						userPosition,
						listItem,
						index,
						currentUserData,
					});

					return (
						<ListItem
							key={listItem.id}
							listItem={item}
							user={user}
							index={index}
							viewType={viewType}
							currLevel={currLevel}
							setCurrLevel={setCurrLevel}
							isChannel={isChannel}
							levelStack={levelStack}
							userPosition={userPosition}
							setLevelStack={setLevelStack}
							LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default List;
