import { Accordion } from '@cogoport/components';

import SubModuleContent from '../SubModuleContent';

import styles from './styles.module.css';

function ModuleNavigation({ data = [], setChapterIds = () => {}, setChapterContent = () => {}, setIndexes }) {
	return (
		<div className={styles.container}>
			{data?.map((module, moduleIndex) => (
				<Accordion
					key={module.id}
					type="text"
					className={styles.module_accordion}
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
								title={(
									<div className={styles.flex}>
										<div className={styles.number}>
											<div className={styles.index}>
												{moduleIndex + 1}
												.
												{subModuleIndex + 1}
											</div>
										</div>
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
									setChapterIds={setChapterIds}
									setChapterContent={setChapterContent}
								/>

							</Accordion>

						))}

					</div>

				</Accordion>

			))}
		</div>
	);
}

export default ModuleNavigation;
