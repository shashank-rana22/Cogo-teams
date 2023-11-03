import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../../constants/leaderboard-reporttype-constants';
import checkToBlurItem from '../../../../../../../utils/check-blur-item';

import styles from './styles.module.css';
import useListItem from './useListItem';

const { AGENT_REPORT, ADMIN_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getClassName = ({
	isAllowed, listItem = {},
	index = 0, user = {}, userPosition, viewType, currLevel = {},
}) => `${styles.list_row} 
			${listItem.rank === GLOBAL_CONSTANTS.one ? styles.box_shadow : ''} 
			${isAllowed ? styles.hover : ''}
			${checkToBlurItem({
		user,
		listItem,
		index,
		userPosition,
		viewType,
		currLevel,
	}) ? styles.blurred : ''}`;

const selectionCheck = ({ currLevel = {}, listItem = {} }) => !isEmpty(currLevel.user?.id)
	&& currLevel.report_type === AGENT_REPORT
	&& currLevel.user?.id === listItem.user?.id;

const getBackgroundColor = ({ listItem = {}, currLevel = {}, user = {} }) => {
	if (selectionCheck({ currLevel, listItem })) return '#fef199';
	if (user.id === listItem.user?.id) return '#faf8df';

	return '#fff';
};

function conditionalWrapper({ condition, title, wrapper, children }) {
	return condition ? wrapper(children)
		: <div style={title === 'rank' ? { marginLeft: '38px' } : {}}>{children}</div>;
}

function ListItem(props) {
	const { listItem, user, index, currLevel, LIST_COLUMN_MAPPING, userPosition, viewType } = props;

	const {
		isAllowed,
		handleClick,
	} = useListItem(props);

	return (
		<div
			role="presentation"
			onClick={handleClick}
			className={getClassName({ isAllowed, listItem, index, user, userPosition, viewType, currLevel })}
			style={{ background: getBackgroundColor({ listItem, currLevel, user }) }}
		>
			{LIST_COLUMN_MAPPING.map((columnItem) => {
				const { key, flex, accessor } = columnItem;

				if (key === 'report_type' && currLevel?.report_type === ADMIN_REPORT) return null;

				return (
					<div
						key={key}
						style={{ flex }}
						className={styles.list_column}
					>
						{conditionalWrapper({
							condition : listItem.rank === GLOBAL_CONSTANTS.one && key === 'rank',
							title     : key,
							wrapper   : (children) => (
								<div className={styles.rank_container}>
									<Image
										src={GLOBAL_CONSTANTS.image_url.performance_leaderboard_ranking_badge}
										width={30}
										height={30}
										alt="Badge"
										style={{ marginRight: '8px' }}
									/>
									{children}
								</div>
							),
							children: accessor(listItem),
						})}

					</div>
				);
			})}

		</div>

	);
}

export default ListItem;
