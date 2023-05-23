import { Input, Button } from '@cogoport/components';
import { IcMArrowDown, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ setShowCoursesModal }) {
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
		</div>
	);
}

export default Header;
