import { Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMDelete, IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import ExtendValidityModal from '../ExtendValidityModal';

import styles from './styles.module.css';

const handleEditQuestionSet = ({ id, router }) => {
	router.push(`/learning/test-module/question?mode=edit&id=${id}`);
};

const handleViewQuestionSet = ({ id, router }) => {
	router.push(`/learning/test-module/question?mode=view&id=${id}`);
};

const handleEditTest = ({ id, router }) => {
	router.push(`/learning/test-module/create-test?mode=edit&id=${id}`);
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

export function TestSetButtons({
	current_status,
	loading,
	id,
	setShowModal,
	setTestId,
	router,
	validity_end = '',
	validity_start = '',
	fetchList = () => {},
}) {
	const [showExtendValidityModal, setShowExtendValidityModal] = useState(false);

	return (
		<div>
			<div className={styles.container}>
				<Tooltip
					className={styles.tooltip_pad}
					content={(
						<div className={styles.options}>
							{['upcoming', 'draft'].includes(current_status) ? (
								<>
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
								</>
							) : null}

							{current_status !== 'draft' ?	(
								<Button
									loading={loading}
									themeType="secondary"
									className={styles.btn}
									type="button"
									onClick={() => {
										setShowExtendValidityModal(true);
									}}
								>
									<IcMEdit />
									<div>Extend Validity</div>
								</Button>
							) : null }

						</div>
					)}
					trigger="click"
					placement="left"
					interactive="true"
				>
					<IcMOverflowDot style={{ cursor: 'pointer' }} />
				</Tooltip>
			</div>

			{showExtendValidityModal ? (
				<ExtendValidityModal
					showExtendValidityModal={showExtendValidityModal}
					setShowExtendValidityModal={setShowExtendValidityModal}
					validity_end={validity_end}
					validity_start={validity_start}
					setShowModal={setShowModal}
					id={id}
					fetchList={fetchList}
				/>
			) : null}
		</div>
	);
}
