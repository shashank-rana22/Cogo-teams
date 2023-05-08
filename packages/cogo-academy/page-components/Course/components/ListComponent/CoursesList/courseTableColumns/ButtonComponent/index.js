import { Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMDelete, IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const handleEditCourse = ({ router }) => {
	router.push('/learning/course');
};

const handleViewCourse = ({ router }) => {
	router.push('/learning/course');
};

export function StudentListButtons({ item, router, setCourseId, setShowModal, loading }) {
	return (
		<div className={styles.container}>
			<Tooltip
				className={styles.tooltip_pad}
				content={(
					<div className={styles.options}>
						<Button
							loading={loading}
							type="button"
							themeType="primary"
							className={styles.btn}
							onClick={() => handleViewCourse({ id: item.id, router })}
						>
							<IcMEyeopen />
							<div>
								View
							</div>
						</Button>

						<Button
							loading={loading}
							type="button"
							themeType="secondary"
							className={styles.btn}
							onClick={() => handleEditCourse({ id: item.id, router })}
						>
							<IcMEdit />
							<div>
								Edit
							</div>
						</Button>

						<Button
							loading={loading}
							type="button"
							themeType="secondary"
							className={styles.btn}
							onClick={() => {
								setCourseId(item.id);
								setShowModal(true);
							}}
						>
							<IcMDelete />
							<div>
								Delete
							</div>
						</Button>
					</div>
				)}
				trigger="click"
				placement="left"
				interactive="true"
			>
				<IcMOverflowDot style={{ cursor: 'pointer' }} />
			</Tooltip>
		</div>
	);
}
