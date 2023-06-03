import { Accordion } from '@cogoport/components';
import { IcMFtick, IcMLock, IcMUnlock } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import isSubModuleComplete from '../../utils/isSubModuleComplete';
import SubModuleContent from '../SubModuleContent';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

function ModuleNavigation({
	data = {}, loading,
	courseProgressUpdateLoading, chapter, setChapter = () => {}, indexes, setIndexes,
	setShowTestData,
	showTestData
}) {
	const { name = '' } = data.course_details || {};

	console.log('showTestData',showTestData);

	// const { course_completion_value = 0, course_completion_unit = '' } = course_completion_duration;

	if (loading || courseProgressUpdateLoading) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>

			<div>
				<h3 className={styles.course_name}>{name}</h3>
				{/*
				<div className={styles.duration}>
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
										className={styles.flex}>
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
										setShowTestData={setShowTestData}
									/>
								</Accordion>
							))}
						</div>
					</Accordion>

			))}

			{(!isEmpty(data?.course_details?.tests)) ? (
					<div 
					className={(data?.all_chapters_completed) ? styles.box_active : styles.box_deactive}
					role="button"
					tabIndex="0"
					onClick={() => { (data?.all_chapters_completed) ? setShowTestData(true) : null;}}>
						{(data?.all_chapters_completed) ?<IcMUnlock height={20} width={20}/> : <IcMLock height={20} width={20}/>}
						<div>
							Course Completion Test
						</div>
					</div>,
			) : null}
		</div>
	);
}

export default ModuleNavigation;
