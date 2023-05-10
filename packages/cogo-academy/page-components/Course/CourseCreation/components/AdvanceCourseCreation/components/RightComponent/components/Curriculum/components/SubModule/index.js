import { Button } from '@cogoport/components';

import Chapter from '../Chapter';

import styles from './styles.module.css';
import SubModuleComponent from './SubModuleComponent';

function SubModule({ module, handleDragStart, handleDragOver, handleDrop, deleteModule }) {
	return (
		<div>
			{module.children.map((subModule, nodeIndex) => (
				<div className={styles.node_container}>
					<SubModuleComponent
						nodeIndex={nodeIndex}
						module={subModule}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDrop={handleDrop}
						deleteModule={deleteModule}
					/>

					{subModule.children && (
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
			>
				+ Sub Module
			</Button>
		</div>
	);
}

export default SubModule;
