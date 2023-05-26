import { Accordion } from '@cogoport/components';

import SubModuleContent from '../SubModuleContent';

import styles from './styles.module.css';

function ModuleNavigation({ data = [] }) {
	return (
		<div className={styles.container}>
			{data?.map((module, index) => (
				<Accordion
					key={module.id}
					type="text"
					className={styles.module_accordion}
					title={(
						<div className={styles.flex}>
							<div className={styles.number}>
								<div className={styles.index}>{index + 1}</div>
							</div>
							<div className={styles.name}>{module.name}</div>
						</div>
					)}
				>
					<div>
						{module?.course_sub_modules?.map((subModule, subIndex) => (
							<Accordion
								key={subModule.id}
								type="text"
								className={styles.submodule_accordion}
								title={(
									<div className={styles.flex}>
										<div className={styles.number}>
											<div className={styles.index}>
												{index + 1}
												.
												{subIndex + 1}
											</div>
										</div>
										<div className={styles.name}>{subModule.name}</div>
									</div>
								)}
							>
								<SubModuleContent id={subModule.id} />
							</Accordion>
						))}

					</div>

				</Accordion>

			))}
		</div>
	);
}

export default ModuleNavigation;
