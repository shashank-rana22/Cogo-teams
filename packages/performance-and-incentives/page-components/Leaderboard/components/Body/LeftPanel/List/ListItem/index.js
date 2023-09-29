import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';
import useListItem from './useListItem';

function conditionalWrapper({ condition, title, wrapper, children }) {
	return condition ? wrapper(children)
		: <div style={title === 'rank' ? { marginLeft: '38px' } : {}}>{children}</div>;
}

function ListItem(props) {
	const { listItem, user } = props;

	const {
		LIST_COLUMN_MAPPING,
		isAllowed,
		handleClick,
	} = useListItem(props);

	return (
		<div
			role="presentation"
			style={user.id === listItem.user?.id ? { background: '#faf8df' } : {}}
			className={
				cl`${styles.list_row} 
				${listItem.rank === GLOBAL_CONSTANTS.one ? styles.box_shadow : ''} 
				${isAllowed ? styles.hover : ''}`
			}
			onClick={handleClick}
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
