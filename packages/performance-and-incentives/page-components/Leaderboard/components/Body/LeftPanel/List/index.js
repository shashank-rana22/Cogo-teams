import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../../common/LoadingState';

import getListColumnMapping from './get-list-column-mapping';
import ListItem from './ListItem';
import styles from './styles.module.css';

function List(props) {
	const {
		loading, list, params, setParams, handleClick, viewType, currLevel, currentUserData,
	} = props;

	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const LIST_COLUMN_MAPPING = getListColumnMapping({ params, setParams });

	if (loading) {
		return <LoadingState />;
	}

	if (!loading && isEmpty(list) && isEmpty(currentUserData)) {
		return (
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_customer_card}
				width={350}
				height={400}
				alt="Empty List"
				className={styles.empty_img}
			/>
		);
	}

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
				{list.map((listItem) => (
					<ListItem
						key={listItem.id}
						listItem={listItem}
						handleClick={handleClick}
						viewType={viewType}
						user={user}
						currLevel={currLevel}
						currentUserData={currentUserData}
					/>
				))}

				{(!isEmpty(currentUserData) && isEmpty(list.find((item) => item.user?.id === user.id))) ? (
					<>
						<div>
							<span>.</span>
							<span>.</span>
							<span>.</span>
						</div>
						<ListItem
							listItem={currentUserData}
							handleClick={handleClick}
							viewType={viewType}
							user={user}
							currLevel={currLevel}
						/>
					</>

				) : null}

			</div>
		</div>
	);
}

export default List;
