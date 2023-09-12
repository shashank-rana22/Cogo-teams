import { isEmpty } from '@cogoport/utils';

import Card from './Card';
import Empty from './Empty';
import LoaderComp from './Loader';
import styles from './styles.module.css';

function Body({
	loading = false,
	list = [],
	handleNotificationClick = () => {},
	setShowPopover = () => {},
}) {
	if (loading) { return <LoaderComp />; }

	if (isEmpty(list)) return <Empty />;

	return (
		<div className={styles.body_container}>
			{list?.map((item) => (
				<Card
					key={item}
					item={item}
					handleNotificationClick={handleNotificationClick}
					setShow={setShowPopover}
				/>
			))}
		</div>
	);
}

export default Body;
