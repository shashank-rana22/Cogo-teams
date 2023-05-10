import { Button } from '@cogoport/components';
import { IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';

import Chapter from '../Chapter';

import styles from './styles.module.css';

function SubModule({ node, handleDragStart, handleDragOver, handleDrop, deleteModule }) {
	return (
		<div>
			{node.children.map((subModule, nodeIndex) => (
				<div className={styles.node_container}>
					<div
						key={subModule.id}
						draggable
						onDragStart={(event) => handleDragStart(event, subModule, false)}
						onDragOver={(event) => handleDragOver(event)}
						onDrop={(event) => handleDrop(event, subModule, false)}
						className={styles.node}
					>
						<IcMDrag className={styles.icon} />
						<div className={`${styles.left} ${styles.flex}`}>
							{`Sub Module ${nodeIndex + 1}:`}
							{' '}
							<b className={styles.name}>{subModule.name}</b>
						</div>

						<IcMEdit className={`${styles.left} ${styles.icon}`} />
						<IcMDelete
							onClick={() => deleteModule({ id: subModule.id, isNew: subModule.isNew || false })}
							className={`${styles.left} ${styles.icon}`}
						/>
					</div>

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
