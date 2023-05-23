import styles from './styles.module.css';

function LeftComponent({ finalCourseCategories, currentCategory, setCurrentCategory, fetchList }) {
	const handleChangeActiveTab = ({ value }) => {
		if (currentCategory !== value) {
			setCurrentCategory(value);
			fetchList();
		}
	};

	return (
		<>
			{finalCourseCategories.map((category) => {
				const { id, display_name, name } = category || {};

				return (
					<div
						key={id}
						role="presentation"
						onClick={() => handleChangeActiveTab({ value: name })}
						className={`${styles.ind_container} ${currentCategory === name && styles.active_tab}`}
					>
						<div>{display_name}</div>
					</div>
				);
			})}
		</>
	);
}

export default LeftComponent;
