import { Accordion } from '@cogoport/components';
import { IcMFtick, IcMLock, IcMUnlock } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import isSubModuleComplete from '../../utils/isSubModuleComplete';
import SubModuleContent from '../SubModuleContent';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

const INDEX_TO_VALUE_DIF = 1;

function ModuleNavigation({
	data = {},
	loading,
	courseProgressUpdateLoading,
	chapter,
	setChapter = () => {},
	indexes,
	setIndexes,
	setShowTestData,
	showTestData,
	showFeedback,
	setShowFeedback,
	viewType = '',
}) {
	const {
		course_details = {},
		all_chapters_completed = false,
		test_completed = false,
		test_mapping = {},
		course_modules = [],
	} = data;

	const { name = '', tests = [] } = course_details;

	const setStates = ({ feedback, test, Chapter }) => {
		setShowFeedback(feedback);
		setShowTestData(test);
		setChapter(Chapter);
	};

	const showFeedbackPage = all_chapters_completed && (test_completed || isEmpty(test_mapping || {}));

	if (loading || courseProgressUpdateLoading) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.course_name}>{name}</h3>

			{course_modules.map((module, moduleIndex) => (
				<Accordion
					key={module.id}
					type="text"
					className={styles.module_accordion}
					isOpen={moduleIndex === indexes.moduleIndex}
					title={(
						<div className={styles.flex}>
							<div className={styles.number}>
								<div className={styles.index}>{moduleIndex + INDEX_TO_VALUE_DIF}</div>
							</div>
							<div className={styles.name}>{module.name}</div>
						</div>
					)}
				>
					{(module.course_sub_modules || []).map((subModule, subModuleIndex) => (
						<Accordion
							key={subModule.id}
							type="text"
							className={styles.submodule_accordion}
							isOpen={subModuleIndex === indexes.subModuleIndex}
							title={(
								<div
									className={styles.flex}
								>
									{isSubModuleComplete(moduleIndex, subModuleIndex, data)
										? (
											<>
												<IcMFtick
													fill="#849E4C"
													width={28}
													height={28}
													className={styles.icon}
												/>
												<div className={styles.indexes}>
													{' '}
													{moduleIndex + INDEX_TO_VALUE_DIF}
													.
													{subModuleIndex + INDEX_TO_VALUE_DIF}
												</div>

											</>
										) : (
											<div className={styles.number}>
												<div className={styles.index}>
													{moduleIndex + INDEX_TO_VALUE_DIF}
													.
													{subModuleIndex + INDEX_TO_VALUE_DIF}
												</div>
											</div>
										)}

									<div className={styles.name}>{subModule.name}</div>
								</div>
							)}
						>
							<SubModuleContent
								key={subModule.id}
								id={subModule.id}
								data={subModule.course_sub_module_chapters}
								moduleIndex={moduleIndex}
								subModuleIndex={subModuleIndex}
								setIndexes={setIndexes}
								chapter={chapter}
								setChapter={setChapter}
								setStates={setStates}
							/>
						</Accordion>
					))}
				</Accordion>
			))}

			{(!isEmpty(tests)) ? (
				<div
					className={
					`${(all_chapters_completed || test_completed)
						? styles.box_active : styles.box_deactive} 
					${showTestData ? styles.box_selected : styles.box_notselected}`
}
					role="button"
					tabIndex="0"
					onClick={() => {
						if (all_chapters_completed || test_completed) {
							setStates({ feedback: false, test: true, Chapter: {} });
						}
					}}
				>
					{(all_chapters_completed || test_completed)
						? <IcMUnlock height={20} width={20} /> : <IcMLock height={20} width={20} />}
					<div className={styles.text}>
						Course Completion Test
					</div>
				</div>
			) : null}

			{viewType !== 'preview' ? (
				<div
					className={`${showFeedbackPage ? styles.box_active : styles.box_deactive} ${
						showFeedback ? styles.box_selected : styles.box_notselected
					}`}
					role="presentation"
					onClick={() => {
						if (showFeedbackPage) {
							setStates({ feedback: true, test: false, Chapter: {} });
						}
					}}
				>
					{showFeedbackPage ? (
						<IcMUnlock height={20} width={20} />
					) : (
						<IcMLock height={20} width={20} />
					)}

					<div className={styles.text}>Course Completion</div>
				</div>
			) : null}
		</div>
	);
}

export default ModuleNavigation;
