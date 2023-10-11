import TEXT_MAPPING from '../../../../configurations/header-text-mapping';

import getListColumnMapping from './get-list-column-mapping';
import styles from './styles.module.css';

const MAX_LIST_ITEMS = 8;

function List(props) {
	const { tableList, view, totalReportCount } = props;

	const LIST_COLUMN_MAPPING = getListColumnMapping({ view });

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
				{tableList.map((listItem) => (
					<div key={listItem.id} className={styles.list_row}>
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
				))}
			</div>

			{ totalReportCount > MAX_LIST_ITEMS ? (
				<p className={styles.info_text}>
					+
					{totalReportCount - MAX_LIST_ITEMS}
					{' '}
					More
					{' '}
					{TEXT_MAPPING[view]}
				</p>
			) : null}

		</div>
	);
}

export default List;
