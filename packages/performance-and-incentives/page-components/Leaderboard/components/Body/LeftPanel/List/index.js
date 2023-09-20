import getListColumnMapping from './get-list-column-mapping';
import ListItem from './ListItem';
import styles from './styles.module.css';

function List(props) {
	const {
		table_list = [{
			rank       : 1,
			name       : 'madhesh',
			score      : '3000',
			percentile : '50',
			children   : [{
				rank       : 2,
				name       : 'khushal',
				score      : '2000',
				percentile : '75%',

				children: [{
					rank  : 3,
					name  : 'vimal',
					score : '3000',
				}],
			}],
		}, {
			rank       : 5,
			name       : 'mohith',
			score      : '3000',
			percentile : '50',
		}],
	} = props;

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
				{table_list.map((listItem, index) => <ListItem key={listItem.id} listItem={listItem} index={index} />)}
			</div>
		</div>
	);
}

export default List;
