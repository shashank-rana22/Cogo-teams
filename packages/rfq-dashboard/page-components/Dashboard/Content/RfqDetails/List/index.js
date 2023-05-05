import Card from './Card';
import styles from './styles.module.css';

function List({ checkedItems, setCheckedItems, setSelectAll, data }) {
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
					item={item}
					handleCheck={handleCheck}
					checkedItems={checkedItems}
				/>
			))}
		</div>
	);
}

export default List;
