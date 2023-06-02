import { Input, Button } from '@cogoport/components';
import { IcMArrowDown, IcMSearchlight, IcMHelpInCircle } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import CoursesModal from '../CoursesModal';
import ReportErrorModal from '../ReportErrorModal';

import styles from './styles.module.css';

function Header({ loading, courseCategories, currentCategory, setCurrentCategory, debounceQuery }) {
	const [showErrorModal, setShowErrorModal] = useState(false);

	const router = useRouter();

	const [showCoursesModal, setShowCoursesModal] = useState(false);

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
					onChange={(val) => debounceQuery(val)}
				/>

				<div className={styles.profile}>
					<Button
						themeType="tertiary"
						onClick={() => setShowErrorModal(true)}
					>
						Report Issue
						&nbsp;&nbsp;
						<IcMHelpInCircle width={18} height={18} />
					</Button>

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

			{showErrorModal ? (
				<ReportErrorModal
					loading={loading}
					showErrorModal={showErrorModal}
					setShowErrorModal={setShowErrorModal}
				/>
			) : null}
		</>
	);
}

export default Header;
