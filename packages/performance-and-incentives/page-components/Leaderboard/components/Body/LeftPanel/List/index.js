import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import getListColumnMapping from './get-list-column-mapping';
import ListItem from './ListItem';
import styles from './styles.module.css';

function List(props) {
	const { list, params, setParams, handleClick, viewType, currLevel, currentUserData } = props;

	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const LIST_COLUMN_MAPPING = getListColumnMapping({ params, setParams });

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
				{list.map((listItem, index) => (
					<ListItem
						key={listItem.id}
						listItem={listItem}
						index={index}
						handleClick={handleClick}
						viewType={viewType}
						user={user}
						currLevel={currLevel}
						currentUserData={currentUserData}
					/>
				))}

				{(!isEmpty(currentUserData) && isEmpty(list.find((item) => item.user?.id === user.id))) ? (
					<ListItem
						listItem={currentUserData}
						handleClick={handleClick}
						viewType={viewType}
						user={user}
						currLevel={currLevel}
					/>
				) : null}

			</div>
		</div>
	);
}

export default List;
