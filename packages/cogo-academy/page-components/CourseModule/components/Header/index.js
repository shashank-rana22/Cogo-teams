import { Input, Button } from '@cogoport/components';
import { IcMArrowDown, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import CoursesModal from '../CoursesModal';

import styles from './styles.module.css';

function Header({ loading, courseCategories, currentCategory, setCurrentCategory }) {
	const [showCoursesModal, setShowCoursesModal] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>
				<div className={styles.title}>Cogo Courses</div>

				<Button
					size="lg"
					type="button"
					onClick={() => setShowCoursesModal(true)}
				>
					Courses
					{' '}
					<IcMArrowDown style={{ marginLeft: '8px' }} />
				</Button>
			</div>

			<Input
				placeholder="Search by Course, Category, Topic or Tags"
				suffix={<IcMSearchlight style={{ marginRight: '12px' }} />}
			/>

			{showCoursesModal ? (
				<CoursesModal
					loading={loading}
					courseCategories={courseCategories}
					showCoursesModal={showCoursesModal}
					setShowCoursesModal={setShowCoursesModal}
					currentCategory={currentCategory}
					setCurrentCategory={setCurrentCategory}
				/>
			) : null}
		</div>
	);
}

export default Header;
