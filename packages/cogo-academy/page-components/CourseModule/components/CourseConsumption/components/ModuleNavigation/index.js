import { Accordion } from '@cogoport/components';
import { IcMFtick, IcMLock, IcMUnlock } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import isSubModuleComplete from '../../utils/isSubModuleComplete';
import SubModuleContent from '../SubModuleContent';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

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
}) {
	const { course_details = {}, all_chapters_completed = false, test_completed = false, test_mapping = {} } = data;

	const { name = '', tests = [] } = course_details;

	// const { course_completion_value = 0, course_completion_unit = '' } = course_completion_duration;

	const setStates = (feedback, test, Chapter) => {
		setShowFeedback(feedback);
		setShowTestData(test);
		setChapter(Chapter);
	};

	if (loading || courseProgressUpdateLoading) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>
			<div>
				<h3 className={styles.course_name}>{name}</h3>

				{/* <div className={styles.duration}>
					Complete in
					{' '}
					{course_completion_value}
					{' '}
					{course_completion_unit}
					s
					{' '}
					to Get Certification
					<Pill size="md" color="#C4DC91">On or Before 30 June, 2023</Pill>
				</div> */}
			</div>

			{(data.course_modules || []).map((module, moduleIndex) => (
				<Accordion
					key={module.id}
					type="text"
					className={styles.module_accordion}
					isOpen={moduleIndex === indexes.moduleIndex}
					title={(
						<div className={styles.flex}>
							<div className={styles.number}>
								<div className={styles.index}>{moduleIndex + 1}</div>
							</div>
							<div className={styles.name}>{module.name}</div>
						</div>
					)}
				>
					<div>
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
														{moduleIndex + 1}
														.
														{subModuleIndex + 1}
													</div>

												</>
											) : (
												<div className={styles.number}>
													<div className={styles.index}>
														{moduleIndex + 1}
														.
														{subModuleIndex + 1}
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
					</div>
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
							setStates(false, true, {});
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

			<div
				className={`${
					test_completed || isEmpty(test_mapping || {})
						? styles.box_active
						: styles.box_deactive
				} ${showFeedback ? styles.box_selected : styles.box_notselected}`}
				role="button"
				tabIndex="0"
				onClick={() => {
					if (test_completed || isEmpty(test_mapping || {})) {
						setStates(true, false, {});
					}
				}}
			>
				{all_chapters_completed && (test_completed || isEmpty(test_mapping || {})) ? (
					<IcMUnlock height={20} width={20} />
				) : (
					<IcMLock height={20} width={20} />
				)}

				<div className={styles.text}>Course Completion</div>
			</div>
			;

		</div>
	);
}

export default ModuleNavigation;
