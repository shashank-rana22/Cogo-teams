import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function ListCard(props) {
	const {
		listItem = {},
		LIST_COLUMN_MAPPING,
		loadingListObjectives = false,
	} = props;

	if (loadingListObjectives) {
		return (
			<div className={styles.loader_container}>
				<Placeholder height="80px" width="500px" />
			</div>
		);
	}

	return (
		<div className={styles.list_card}>
			{LIST_COLUMN_MAPPING.map((column) => {
				const { key, flex, accessor } = column;

				return (
					<div
						key={key}
						style={{ flex, flexDirection: 'column', alignItems: 'flex-start' }}
						className={styles.card_column}
					>
						{accessor(listItem)}
					</div>
				);
			})}
		</div>
	);
}

export default ListCard;
