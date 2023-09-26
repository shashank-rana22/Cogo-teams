import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import getListColumnMapping from '../get-list-column-mapping';

import styles from './styles.module.css';

const handleClick = ({ listItem, actionsAllowed, handlePropagation, setStatParams }) => {
	if (actionsAllowed) {
		if (listItem.report_type === 'kam_report') {
			setStatParams((prev) => ({
				...prev,
				filters: {
					...prev.filters,
					report_view_type : undefined,
					user_rm_ids      : undefined,
					report_type      : 'kam_report',
					user_id          : listItem.user?.id,
				},
			}));
		} else {
			handlePropagation({
				id          : listItem.user?.id,
				location_id : !isEmpty(listItem.user) ? undefined : listItem.id,
				channel     : !isEmpty(listItem.user) ? undefined : listItem.name,
			});
		}
	}
};

function conditionalWrapper({ condition, title, wrapper, children }) {
	return condition ? wrapper(children)
		: <div style={title === 'rank' ? { marginLeft: '38px' } : {}}>{children}</div>;
}

function ListItem(props) {
	const { listItem = {}, handlePropagation, viewType, currLevel, user, setStatParams } = props;

	const isFirstEntry = listItem.rank === GLOBAL_CONSTANTS.one;

	const boxShadow = isFirstEntry ? styles.box_shadow : '';

	const LIST_COLUMN_MAPPING = getListColumnMapping({});

	const [currView] = currLevel[GLOBAL_CONSTANTS.zeroth_index].split('_') || [];

	const isAllowed = (`${currView}_view` !== viewType)
	|| (user.id === listItem?.user?.id || viewType === 'admin_view');

	const actionsAllowed = isAllowed;

	return (
		<div
			role="presentation"
			style={user.id === listItem.user?.id ? { background: '#faf8df' } : {}}
			className={cl`${styles.list_row} ${boxShadow} ${actionsAllowed ? styles.hover : ''}`}
			onClick={() => { handleClick({ listItem, actionsAllowed, handlePropagation, setStatParams }); }}
		>
			{LIST_COLUMN_MAPPING.map((columnItem) => {
				const { key, flex, accessor } = columnItem;

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
										src={GLOBAL_CONSTANTS.image_url.badge}
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
