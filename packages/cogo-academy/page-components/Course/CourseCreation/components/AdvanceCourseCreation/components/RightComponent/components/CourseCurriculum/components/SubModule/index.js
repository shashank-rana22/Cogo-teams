import { Button } from '@cogoport/components';

import Chapter from '../Chapter';

import styles from './styles.module.css';
import SubModuleComponent from './SubModuleComponent';
import useHandleSubModule from './useHandleSubModule';

function SubModule({
	module,
	handleDragStart,
	handleDragOver,
	handleDrop,
	id,
	course_module_id,
	getLoading,
	getCourseModuleDetails,
}) {
	const {
		onSaveSubModule,
		subModuleLoading,
		addNewCourseSubModule,
		courseSubModule,
		setCourseSubModule,
	} = useHandleSubModule({
		getLoading,
		getCourseModuleDetails,
		module,
		id,
		course_module_id,
	});

	return (
		<div style={{ marginTop: '16px' }}>
			{courseSubModule.map((subModule, nodeIndex) => (
				<div className={styles.node_container}>
					<SubModuleComponent
						nodeIndex={nodeIndex}
						subModule={subModule}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						id={id}
						onSaveSubModule={onSaveSubModule}
						course_module_id={course_module_id}
						setCourseSubModule={setCourseSubModule}
						subModuleLoading={subModuleLoading}
					/>

					{subModule.course_sub_module_chapters && !subModule.isNew && (
						<Chapter
							subModule={subModule}
							handleDragStart={handleDragStart}
							handleDragOver={handleDragOver}
							handleDrop={handleDrop}
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
				onClick={addNewCourseSubModule}
			>
				+ Sub Module
			</Button>
		</div>
	);
}

export default SubModule;
