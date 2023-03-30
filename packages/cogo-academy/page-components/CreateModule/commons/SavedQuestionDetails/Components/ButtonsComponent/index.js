import { Button, Tooltip } from '@cogoport/components';
import { IcMOverflowDot, IcMDelete, IcMEdit } from '@cogoport/icons-react';

import useSavedQuestionDetails from '../../useSavedQuestionDetails';
import DeleteModal from '../DeleteModal';

import styles from './styles.module.css';

function ButtonsComponent({
	item,
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	setEditDetails,
	allKeysSaved,
	mode,
}) {
	const {
		handleEditQuestion,
		handleDeleteQuestion,
		loading,
		showModal,
		setShowModal,
		caseStudyLoading,
	} = useSavedQuestionDetails({
		setAllKeysSaved,
		getTestQuestionTest,
		questionSetId,
		setEditDetails,
	});

	return (
		<div className={styles.container}>
			<Tooltip
				className={styles.tooltip_pad}
				content={(
					<div className={styles.options}>
						<Button
							type="button"
							onClick={() => handleEditQuestion({ item })}
							themeType="secondary"
							className={styles.btn}
							disabled={!allKeysSaved || loading || caseStudyLoading}
						>
							<IcMEdit />
							<div
								style={{ marginLeft: '8px' }}
							>
								{mode !== 'view' && item.question_type === 'case_study'
									? 'Edit' : 'View'}

							</div>
						</Button>

						{mode !== 'view' ? (
							<Button
								type="button"
								themeType="accent"
								className={styles.btn}
								disabled={!allKeysSaved}
								loading={loading || caseStudyLoading}
								onClick={() => {
									setShowModal(item);
								}}
							>
								<IcMDelete />
								<div style={{ marginLeft: '8px' }}>
									Delete
								</div>
							</Button>
						) : null}
					</div>
				)}
				trigger="click"
				placement="left"
				interactive="true"
			>
				<IcMOverflowDot style={{ cursor: 'pointer' }} />
			</Tooltip>

			<DeleteModal
				showModal={showModal}
				setShowModal={setShowModal}
				handleDeleteQuestion={handleDeleteQuestion}
			/>
		</div>
	);
}

export default ButtonsComponent;
