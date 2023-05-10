import { Button, Input, Textarea } from '@cogoport/components';
import { IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SubModuleComponent({ module, deleteModule, handleDragStart, handleDragOver, handleDrop, nodeIndex }) {
	if (module.isNew) {
		return (
			<div className={styles.module}>
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
						onClick={() => deleteModule({ id: module.id, isNew: module.isNew || false })}
						className={`${styles.left} ${styles.icon}`}
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			key={module.id}
			draggable
			onDragStart={(event) => handleDragStart(event, module, false)}
			onDragOver={(event) => handleDragOver(event)}
			onDrop={(event) => handleDrop(event, module, false)}
			className={styles.module}
		>
			<IcMDrag className={styles.icon} />
			<div className={`${styles.left} ${styles.flex}`}>
				{`Module ${nodeIndex + 1}:`}
				{' '}
				<b className={styles.name}>{module.name}</b>
			</div>

			<IcMEdit className={`${styles.left} ${styles.icon}`} />
			<IcMDelete
				onClick={() => deleteModule({ id: module.id, isNew: module.isNew || false })}
				className={`${styles.left} ${styles.icon}`}
			/>
		</div>
	);
}

export default SubModuleComponent;
