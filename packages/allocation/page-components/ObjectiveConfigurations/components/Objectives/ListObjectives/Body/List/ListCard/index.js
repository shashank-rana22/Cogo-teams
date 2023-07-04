import { IcMArrowDown } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ListCard(props) {
	const { listItem, LIST_COLUMN_MAPPING } = props;

	return (
		<div className={styles.card_container}>
			<div className={styles.list_card}>
				{LIST_COLUMN_MAPPING.map((column) => {
					const { key, flex, accessor } = column;

					return (
						<div
							key={key}
							style={{ flex }}
							className={styles.card_column}
						>
							{accessor(listItem)}
						</div>
					);
				})}

			</div>

			<div className={styles.view_details}>
				View Details
				<IcMArrowDown style={{ marginLeft: '4px' }} />
			</div>
		</div>
	);
}

export default ListCard;
