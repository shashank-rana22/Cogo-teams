import { Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMDelete, IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const handleOpenCourse = ({ id, router, view }) => {
	if (view === 'view') {
		router.push(`/learning/course/preview?course_id=${id}`);
	} else {
		router.push(`/learning/course/create?mode=${view}&id=${id}`);
	}
};

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
								<div>Preview</div>
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
