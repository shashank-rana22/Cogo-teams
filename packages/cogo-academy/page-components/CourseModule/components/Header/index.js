import { Input, Button } from '@cogoport/components';
import {
	IcMArrowDown,
	IcMSearchlight,
	IcMHelpInCircle,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import CoursesModal from '../CoursesModal';
import ReportErrorModal from '../ReportErrorModal';

import styles from './styles.module.css';

function Header({
	loading,
	currentCategory,
	setCurrentCategory,
	debounceQuery,
	input_required = true,
}) {
	const router = useRouter();

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showCoursesModal, setShowCoursesModal] = useState(false);
	const [input, setInput] = useState('');

	const handleClick = () => {
		router.push('/learning/course');

		if (input_required) {
			setInput('');
			debounceQuery('');
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.button_container}>
					<div
						role="presentation"
						className={styles.title}
						onClick={handleClick}
					>
						Cogo Courses
					</div>

					<Button
						size="lg"
						type="button"
						onClick={() => setShowCoursesModal(true)}
						className={styles.styled_button}
					>
						All Courses
						{' '}
						<IcMArrowDown style={{ marginLeft: '8px' }} />
					</Button>
				</div>

				{input_required ? (
					<Input
						placeholder="Search by Course, Category, Topic or Tags"
						suffix={<IcMSearchlight style={{ marginRight: '12px' }} />}
						onChange={(val) => {
							debounceQuery(val);
							setInput(val);
						}}
						value={input}
					/>
				) : null}

				<div className={styles.profile}>
					<Button themeType="tertiary" onClick={() => setShowErrorModal(true)}>
						Report Issue &nbsp;&nbsp;
						<IcMHelpInCircle width={18} height={18} />
					</Button>
				</div>
			</div>

			{showCoursesModal ? (
				<CoursesModal
					loading={loading}
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
