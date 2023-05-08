import { Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMDelete, IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const handleEditStudent = ({ id, router }) => {
	router.push(`/learning/test-module/question?mode=edit&id=${id}`);
};

const handleViewStudent = ({ id, router }) => {
	router.push(`/learning/test-module/question?mode=view&id=${id}`);
};

export function StudentListButtons({ item, router, setStudentId, setShowModal }) {
	return (
		<div className={styles.container}>
			<Tooltip
				className={styles.tooltip_pad}
				content={(
					<div className={styles.options}>
						<Button
							type="button"
							themeType="primary"
							className={styles.btn}
							onClick={() => handleViewStudent({ id: item.id, router })}
						>
							<IcMEyeopen />
							<div>
								View
							</div>
						</Button>

						<Button
							type="button"
							themeType="secondary"
							className={styles.btn}
							onClick={() => handleEditStudent({ id: item.id, router })}
						>
							<IcMEdit />
							<div>
								Edit
							</div>
						</Button>

						<Button
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
