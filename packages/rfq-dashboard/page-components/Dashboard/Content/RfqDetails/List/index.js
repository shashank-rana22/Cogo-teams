import { useSelector } from '@cogoport/store';

import Card from './Card';
import styles from './styles.module.css';

function List({ checkedItems, setCheckedItems, setSelectAll, data }) {
	const { profile = {} } = useSelector((state) => state);
	const { partner } = profile;
	const { id } = partner;
	const handleCheck = (event) => {
		const { value, checked } = event.target;

		if (checked) {
			setCheckedItems((prevState) => [
				...prevState,
				data.find((item) => item.id === value),
			]);
		} else {
			setCheckedItems((prevState) => prevState.filter((item) => item.id !== value));
			setSelectAll(false);
		}
	};

	return (
		<div className={styles.container}>
			{(data || []).map((item) => (
				<Card
					key={item?.id}
					handleCheck={handleCheck}
					item={item}
					checkedItems={checkedItems}
					partner_id={id}
				/>
			))}
		</div>
	);
}

export default List;
