import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Chapter from '../Chapter';

import styles from './styles.module.css';
import SubModuleComponent from './SubModuleComponent';

function SubModule({
	module, handleDragStart, handleDragOver, handleDrop, deleteModule, id, onSaveSubModule, course_module_id,
}) {
	const { course_sub_modules = [] } = module || {};

	const [courseSubModule, setCourseSubModule] = useState(course_sub_modules);

	if (isEmpty(courseSubModule)) {
		setCourseSubModule([{
			id                         : new Date().getTime(),
			name                       : '',
			course_sub_module_chapters : [],
			isNew                      : true,
			course_module_id,
			cogo_academy_course_id     : id,
		}]);
	}

	const addNewCourseSubModule = () => {
		setCourseSubModule((prev) => [
			...prev,
			{
				id                         : new Date().getTime(),
				name                       : '',
				course_sub_module_chapters : [],
				isNew                      : true,
				course_module_id,
				cogo_academy_course_id     : id,
			},
		]);
	};

	const deleteSubModule = ({ module:moduleData }) => {
		if (moduleData.isNew) {
			setCourseSubModule((prev) => prev.filter((item) => item.id !== moduleData.id));
		}
	};

	useEffect(() => {
		setCourseSubModule(course_sub_modules);
	}, [course_sub_modules]);

	return (
		<div>
			{courseSubModule.map((subModule, nodeIndex) => (
				<div className={styles.node_container}>
					<SubModuleComponent
						nodeIndex={nodeIndex}
						subModule={subModule}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						deleteModule={deleteModule}
						id={id}
						onSaveSubModule={onSaveSubModule}
						course_module_id={course_module_id}
						deleteSubModule={deleteSubModule}
					/>

					{subModule.course_sub_module_chapters && !subModule.isNew && (
						<Chapter
							subModule={subModule}
							handleDragStart={handleDragStart}
							handleDragOver={handleDragOver}
							handleDrop={handleDrop}
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
