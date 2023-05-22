import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../../../../commons/EmptyState';

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
	getSubModuleRefetch,
	setGetSubModuleRefetch,
	showButtons,
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
		showButtons,
	});

	if (isEmpty(courseSubModule)) {
		return <EmptyState emptyText="No sub modules found" />;
	}

	return (
		<div style={{ padding: '16px' }}>
			{courseSubModule.map((subModule, nodeIndex) => (
				<div key={subModule.id} className={`${styles.node_container} ${subModule.isNew && styles.new}`}>
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
						getLoading={getLoading}
						getCourseModuleDetails={getCourseModuleDetails}
						getSubModuleRefetch={getSubModuleRefetch}
						setGetSubModuleRefetch={setGetSubModuleRefetch}
						courseSubModule={courseSubModule}
						showButtons={showButtons}
					/>
				</div>
			))}

			{showButtons ? (
				<Button
					type="button"
					className={styles.button}
					themeType="secondary"
					onClick={addNewCourseSubModule}
					disabled={isEmpty(courseSubModule) || courseSubModule[courseSubModule.length - 1].isNew}
				>
					+ Sub Module
				</Button>
			) : null}
		</div>
	);
}

export default SubModule;
