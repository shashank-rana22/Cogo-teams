import { isEmpty } from '@cogoport/utils';

import Card from './Card';
import Empty from './Empty';
import LoaderComp from './Loader';
import styles from './styles.module.css';

function Body({
	loading,
	list,
	handleNotificationClick,
	setShowPopover,
}) {
	if (loading) { return <LoaderComp />; }

	if (isEmpty(list)) return <Empty />;

	const NEW_LIST = [];

	list.forEach((i) => {
		NEW_LIST.push(i);
		NEW_LIST.push(i);
		NEW_LIST.push(i);
	});

	return (
		<div className={styles.body_container}>
			{NEW_LIST?.map((item) => (
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
