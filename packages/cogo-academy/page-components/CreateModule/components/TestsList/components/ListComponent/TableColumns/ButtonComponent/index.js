import { Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMDelete, IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const handleEditQuestionSet = ({ id, router }) => {
	router.push(`/learning/test-module/question?mode=edit&id=${id}`);
};

const handleViewQuestionSet = ({ id, router }) => {
	router.push(`/learning/test-module/question?mode=view&id=${id}`);
};

const handleEditTest = ({ id, router }) => {
	router.push(`/learning/test-module/create-test?id=${id}`);
};

export function QuestionSetButtons({ item, router, setQuestionSetId, setShowModal, loading }) {
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
							onClick={() => handleViewQuestionSet({ id: item.id, router })}
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
							onClick={() => handleEditQuestionSet({ id: item.id, router })}
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

export function TestSetButtons({ current_status, loading, id, setShowModal, setTestId, router }) {
	return (
		(current_status === 'upcoming' || current_status === 'draft') ? (
			<div role="presentation">
				<div
					style={{
						width  : 'fit-content',
						cursor : 'default',
					}}
				>
					<Tooltip
						className={styles.tooltip_pad}
						content={(
							<div className={styles.options}>
								<Button
									loading={loading}
									themeType="primary"
									className={styles.btn}
									onClick={() => handleEditTest({ id, router })}
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
		) : null
	);
}
