import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getListColumnMapping from './get-list-column-mapping';
import styles from './styles.module.css';

function List(props) {
	const { table_list = [{ rank: 1, name: 'madhesh', score: '3000', percentile: '50' }] } = props;

	const LIST_COLUMN_MAPPING = getListColumnMapping();

	return (
		<div className={styles.list_container}>
			<div className={styles.list_header_container}>
				{LIST_COLUMN_MAPPING.map((item) => {
					const { key, Header, flex } = item;

					if (!Header) return <div />;

					return <div key={key} style={{ flex }}>{Header}</div>;
				})}
			</div>

			<div className={styles.list_body_container}>
				{table_list.map((listItem, index) => {
					const isFirstEntry = index === GLOBAL_CONSTANTS.zeroth_index;
					const boxShadow = isFirstEntry ? styles.box_shadow : '';

					return (
						<div key={listItem.id} className={cl`${styles.list_row} ${boxShadow}`}>
							{LIST_COLUMN_MAPPING.map((columnItem) => {
								const { key, flex, accessor } = columnItem;

								return (
									<div
										key={key}
										style={{ flex }}
										className={styles.list_column}
									>
										{accessor(listItem)}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default List;
