import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import getListColumnMapping from '../get-list-column-mapping';

import styles from './styles.module.css';

function conditionalWrapper({ condition, title, wrapper, children }) {
	return condition ? wrapper(children)
		: <div style={title === 'rank' ? { marginLeft: '38px' } : {}}>{children}</div>;
}

function ListItem(props) {
	const { listItem = {}, index = 0, handleClick, viewType, currLevel, user } = props;

	const isFirstEntry = index === GLOBAL_CONSTANTS.zeroth_index;

	const boxShadow = isFirstEntry ? styles.box_shadow : '';

	const LIST_COLUMN_MAPPING = getListColumnMapping({});

	const isAllowed = (currLevel[GLOBAL_CONSTANTS.zeroth_index]?.split('_') !== viewType)
	|| (user.id === listItem?.user?.id);

	return (
		<div
			className={cl`${styles.list_row} ${boxShadow} ${isAllowed ? styles.hover : ''}`}
			role="presentation"
			onClick={() => {
				if (isAllowed) handleClick({ id: listItem.user?.id });
			}}
			style={user.id === listItem.user?.id ? { background: '#faf8df' } : {}}
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
