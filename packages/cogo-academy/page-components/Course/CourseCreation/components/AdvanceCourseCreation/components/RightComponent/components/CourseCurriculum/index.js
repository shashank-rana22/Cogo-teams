import { Button } from '@cogoport/components';

import SubModule from './components/SubModule';
import ModuleComponent from './ModuleComponent';
import styles from './styles.module.css';
import useHandleCourseCurriculum from './useHandleCourseCurriculum';

function CourseCurriculum({ id }) {
	const {
		handleDragStart,
		handleDrop,
		handleDragOver,
		finalData,
		addModule,
		getLoading,
		setFinalData,
		getCourseModuleDetails,
	} = useHandleCourseCurriculum({ courseId: id });

	return (
		<div className={styles.container}>
			{finalData.map((module, nodeIndex) => (
				<div key={module.id} className={styles.module_container}>
					<ModuleComponent
						nodeIndex={nodeIndex}
						module={module}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						id={id}
						getLoading={getLoading}
						setFinalData={setFinalData}
						getCourseModuleDetails={getCourseModuleDetails}
					/>

					{module.course_sub_modules && !module.isNew && (
						<SubModule
							module={module}
							handleDragStart={handleDragStart}
							handleDragOver={handleDragOver}
							handleDrop={handleDrop}
							id={id}
							course_module_id={module.id}
							getLoading={getLoading}
							getCourseModuleDetails={getCourseModuleDetails}
						/>
					)}
				</div>
			))}

			<Button
				type="button"
				className={styles.button}
				themeType="secondary"
				onClick={() => addModule()}
			>
				+ Module
			</Button>
		</div>
	);
}

export default CourseCurriculum;
