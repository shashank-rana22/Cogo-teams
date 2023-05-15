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
		deleteModule,
		onSaveModule,
		onSaveSubModule,
	} = useHandleCourseCurriculum({ courseId: id });

	console.log('finalData', finalData);

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
						deleteModule={deleteModule}
						onSaveModule={onSaveModule}
						id={id}
					/>

					{module.course_sub_modules && !module.isNew && (
						<SubModule
							module={module}
							handleDragStart={handleDragStart}
							handleDragOver={handleDragOver}
							handleDrop={handleDrop}
							deleteModule={deleteModule}
							id={id}
							course_module_id={module.id}
							onSaveSubModule={onSaveSubModule}
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
