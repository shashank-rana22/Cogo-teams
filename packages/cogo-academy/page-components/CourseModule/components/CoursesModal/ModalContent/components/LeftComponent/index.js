import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function LeftComponent({ finalCourseCategories, currentCategory, setCurrentCategory, fetchList }) {
	const handleChangeActiveTab = ({ id }) => {
		if (currentCategory !== id) {
			setCurrentCategory(id);
			fetchList({ course_category_id: id === 'all_courses' ? undefined : id });
		}
	};

	return (
		<>
			{finalCourseCategories.map((category) => {
				const { id, display_name } = category || {};

				return (
					<div
						key={id}
						role="presentation"
						onClick={() => handleChangeActiveTab({ id })}
						className={`${styles.ind_container} ${currentCategory === id && styles.active_tab}`}
					>
						<div>{startCase(display_name)}</div>
					</div>
				);
			})}
		</>
	);
}

export default LeftComponent;
