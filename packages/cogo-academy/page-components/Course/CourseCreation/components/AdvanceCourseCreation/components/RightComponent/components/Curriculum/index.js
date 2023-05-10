import { Button } from '@cogoport/components';

import SubModule from './components/SubModule';
import ModuleComponent from './ModuleComponent';
import styles from './styles.module.css';
import useHandleCurriculum from './useHandleCurriculum';

function Curriculum() {
	const {
		handleDragStart,
		handleDrop,
		handleDragOver,
		finalData,
		addModule,
		deleteModule,
		onSaveModule,
	} = useHandleCurriculum();

	return (
		<div className={styles.container}>
			{finalData.map((module, nodeIndex) => (
				<div className={styles.module_container}>
					<ModuleComponent
						nodeIndex={nodeIndex}
						module={module}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						deleteModule={deleteModule}
						onSaveModule={onSaveModule}
					/>

					{module.children && !module.isNew && (
						<SubModule
							module={module}
							handleDragStart={handleDragStart}
							handleDragOver={handleDragOver}
							handleDrop={handleDrop}
							deleteModule={deleteModule}
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

export default Curriculum;
