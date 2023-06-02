import { Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMDelete, IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const handleOpenCourse = ({ id, router, view }) => {
	router.push(`/learning/course/create?mode=${view}&id=${id}`);
};

export function StudentButtons({ item, setStudentId, setShowModal, loading }) {
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
								setStudentId(item.id);
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
	setCourseId,
	router,
	status,
	updateApi,
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
								onClick={() => handleOpenCourse({ id, router, view: 'edit' })}
							>
								<IcMEdit />
								<div>Edit</div>
							</Button>

							<Button
								loading={loading}
								themeType="accent"
								className={styles.btn}
								onClick={() => handleOpenCourse({ id, router, view: 'view' })}
							>
								<IcMEyeopen />
								<div>View</div>
							</Button>

							<Button
								loading={loading}
								themeType="secondary"
								className={styles.btn}
								type="button"
								onClick={() => {
									if (status !== 'inactive') {
										setShowModal(true);
										setCourseId(id);
									} else {
										updateApi({ values: { id, status: 'active' } });
									}
								}}
							>
								{status !== 'inactive' ? <IcMDelete /> : null}
								<div>{status !== 'inactive' ? 'Delete' : 'Make active'}</div>
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
