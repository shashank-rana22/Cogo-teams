import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import getListColumnMapping from '../get-list-column-mapping';

import styles from './styles.module.css';

function ListItem(props) {
	const { listItem = {}, index } = props;

	const { children = [] } = listItem;

	const [showChildren, setShowChildren] = useState(false);

	const isFirstEntry = index === GLOBAL_CONSTANTS.zeroth_index;
	const boxShadow = isFirstEntry ? styles.box_shadow : '';

	const LIST_COLUMN_MAPPING = getListColumnMapping();

	return (
		<>
			<div className={cl`${styles.list_row} ${boxShadow}`}>
				{LIST_COLUMN_MAPPING.map((columnItem) => {
					const { key, flex, accessor } = columnItem;

					return (
						<div
							key={key}
							style={{ flex }}
							className={styles.list_column}
							role="presentation"
							onClick={() => setShowChildren((prev) => !prev)}
						>
							{accessor(listItem)}
						</div>
					);
				})}
			</div>

			{showChildren ? children.map((subItem) => <ListItem key={subItem.rank} listItem={subItem} />) : null}

		</>

	);
}

export default ListItem;
