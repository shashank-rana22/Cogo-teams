import { Textarea, Input, Button } from '@cogoport/components';
import { IcMDrag, IcMEdit, IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';
import SubModule from './SubModule';
import useHandleCurriculum from './useHandleCurriculum';

function Curriculum() {
	const { handleDragStart, handleDrop, handleDragOver, finalData, addModule, deleteModule } = useHandleCurriculum();

	return (
		<div className={styles.container}>
			{finalData.map((node, nodeIndex) => (
				<div className={styles.node_container}>
					{node.isNew ? (
						<div className={styles.node}>
							<div className={styles.input_container}>
								<div style={{ marginBottom: '20px' }} className={styles.select_container}>
									<div className={styles.label}>Name</div>
									<Input />
								</div>

								<div className={styles.select_container}>
									<div className={styles.label}>Description</div>
									<Textarea rows={4} />
								</div>
							</div>

							<div className={styles.button_container}>
								<Button size="sm">Save</Button>
								<IcMDelete
									onClick={() => deleteModule({ id: node.id, isNew: node.isNew || false })}
									className={`${styles.left} ${styles.icon}`}
								/>
							</div>
						</div>
					) : (
						<div
							key={node.id}
							draggable
							onDragStart={(event) => handleDragStart(event, node, false)}
							onDragOver={(event) => handleDragOver(event)}
							onDrop={(event) => handleDrop(event, node, false)}
							className={styles.node}
						>
							<IcMDrag className={styles.icon} />
							<div className={`${styles.left} ${styles.flex}`}>
								{`Module ${nodeIndex + 1}:`}
								{' '}
								<b className={styles.name}>{node.name}</b>
							</div>

							<IcMEdit className={`${styles.left} ${styles.icon}`} />
							<IcMDelete
								onClick={() => deleteModule({ id: node.id, isNew: node.isNew || false })}
								className={`${styles.left} ${styles.icon}`}
							/>
						</div>
					)}

					{node.children && !node.isNew && (
						<SubModule
							node={node}
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
