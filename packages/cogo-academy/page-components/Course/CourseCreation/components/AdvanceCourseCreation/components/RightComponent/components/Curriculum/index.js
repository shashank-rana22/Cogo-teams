import { Button, Accordion } from '@cogoport/components';
import { IcMDrag, IcMEdit, IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';
import useHandleCurriculum from './useHandleCurriculum';

function Curriculum() {
	const { handleDragStart, handleDrop, handleDragOver, finalData, addModule, deleteModule } = useHandleCurriculum();

	return (
		<div className={styles.container}>
			{finalData.map((node, nodeIndex) => (
				<div className={styles.node_container}>
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

					{node.children && (
						<div>
							{node.children.map((child) => (
								<div className={styles.child_accordian}>
									<Accordion
										type="text"
										title={(
											<div
												key={child.id}
												draggable
												onDragStart={(event) => handleDragStart(event, child, true)}
												onDragOver={(event) => handleDragOver(event)}
												onDrop={(event) => handleDrop(event, child, true)}
												className={styles.accordian_item}
											>
												<IcMDrag className={styles.icon} />
												<div className={`${styles.left} ${styles.flex}`}>
													{`Sub-Module ${nodeIndex + 1}:`}
													{' '}
													<b className={styles.name}>{child.name}</b>
												</div>

												<IcMEdit className={`${styles.left} ${styles.icon}`} />
												<IcMDelete className={`${styles.left} ${styles.icon}`} />
											</div>
										)}
									>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
										condimentum, nisl eget aliquam tincidunt, nunc nisl aliquam
									</Accordion>
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
