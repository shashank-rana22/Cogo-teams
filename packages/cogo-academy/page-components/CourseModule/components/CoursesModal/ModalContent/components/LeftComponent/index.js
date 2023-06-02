import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function LeftComponent({ finalCourseCategories, currentCategory, setCurrentCategory, fetchList }) {
	const handleChangeActiveTab = ({ value, id }) => {
		if (currentCategory !== value) {
			setCurrentCategory(value);
			fetchList({ course_category_id: id === 'all_courses' ? undefined : id });
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
						onClick={() => handleChangeActiveTab({ value: name, id })}
						className={`${styles.ind_container} ${currentCategory === name && styles.active_tab}`}
					>
						<div>{startCase(display_name)}</div>
					</div>
				);
			})}
		</>
	);
}

export default LeftComponent;
