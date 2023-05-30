import { Input, Button } from '@cogoport/components';
import { IcMArrowDown, IcMSearchlight, IcMProfile } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import CoursesModal from '../CoursesModal';

import styles from './styles.module.css';

function Header({ loading, courseCategories, currentCategory, setCurrentCategory }) {
	const [showCoursesModal, setShowCoursesModal] = useState(false);
	const router = useRouter();

	const handleClick = () => {
		router.push('/learning/course');
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.button_container}>
					<div role="presentation" className={styles.title} onClick={handleClick}>Cogo Courses</div>

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

				<div className={styles.profile}>
					<IcMProfile width={18} height={18} />
					<h4 className={styles.centered}>Hi, Levi</h4>
				</div>
			</div>

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
		</>
	);
}

export default Header;
