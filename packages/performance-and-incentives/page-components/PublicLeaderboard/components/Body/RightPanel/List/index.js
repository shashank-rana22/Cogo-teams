import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getListColumnMapping from './get-list-column-mapping';
import styles from './styles.module.css';

function conditionalWrapper({ condition, title, wrapper, children }) {
	return condition ? wrapper(children)
		: <div style={title === 'rank' ? { marginLeft: '38px' } : {}}>{children}</div>;
}

function List(props) {
	const { tableList, view } = props;

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
					<div
						key={listItem.id}
						className={cl`${styles.list_row} 
						${listItem.rank === 1 ? styles.highlight : ''}`}
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
												<img
													src={GLOBAL_CONSTANTS.image_url.public_leaderboard_ranking_badge}
													alt="Badge"
													className={styles.badge_icon}
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
				))}
			</div>

		</div>
	);
}

export default List;
