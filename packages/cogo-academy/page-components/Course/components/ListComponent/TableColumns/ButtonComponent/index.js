import { Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMDelete, IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const handleEditCourse = ({ id, router }) => {
	router.push(`/learning/course/create?mode=edit&id=${id}`);
};

export function StudentButtons({ item, router, setQuestionSetId, setShowModal, loading }) {
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
								setQuestionSetId(item.id);
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

export function CourseButtons({
	loading,
	id,
	setShowModal,
	setTestId,
	router,
	fetchList = () => {},
}) {
	return (
		<div>
			<div className={styles.container}>
				<Tooltip
					className={styles.tooltip_pad}
					content={(
						<div className={styles.options}>
							<Button
								loading={loading}
								themeType="primary"
								className={styles.btn}
								onClick={() => handleEditCourse({ id, router })}
							>
								<IcMEdit />
								<div>Edit</div>
							</Button>

							<Button
								loading={loading}
								themeType="secondary"
								className={styles.btn}
								type="button"
								onClick={() => {
									setShowModal(true);
									setTestId(id);
								}}
							>
								<IcMDelete />
								<div>Delete</div>
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
		</div>
	);
}
