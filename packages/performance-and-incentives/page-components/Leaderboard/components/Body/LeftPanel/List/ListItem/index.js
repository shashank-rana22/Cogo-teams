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
	const { listItem = {}, index } = props;

	const isFirstEntry = index === GLOBAL_CONSTANTS.zeroth_index;
	const boxShadow = isFirstEntry ? styles.box_shadow : '';

	const LIST_COLUMN_MAPPING = getListColumnMapping();

	return (
		<div className={cl`${styles.list_row} ${boxShadow}`}>
			{LIST_COLUMN_MAPPING.map((columnItem) => {
				const { key, flex, accessor } = columnItem;

				return (
					<div
						key={key}
						style={{ flex }}
						className={styles.list_column}
					>

						{conditionalWrapper({
							condition : isFirstEntry && key === 'rank',
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
