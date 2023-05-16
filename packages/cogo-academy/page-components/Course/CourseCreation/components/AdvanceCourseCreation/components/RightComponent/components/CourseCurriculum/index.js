import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../commons/LoadingState';

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

	if (getLoading && isEmpty(finalData)) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>
			{finalData.map((module, nodeIndex) => (
				<div key={module.id} className={`${styles.module_container} ${module.isNew && styles.new}`}>
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
