import { Accordion, Button } from '@cogoport/components';
import { IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';

import ChapterContent from './ChapterContent';
import styles from './styles.module.css';

function Chapter({ subModule, handleDragStart, handleDragOver, handleDrop }) {
	return (
		<div>
			{subModule.children.map((child, index) => (
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
									{`Chapter ${index + 1}:`}
									{' '}
									<b className={styles.name}>{child.name}</b>
								</div>

								<IcMEdit className={`${styles.left} ${styles.icon}`} />
								<IcMDelete className={`${styles.left} ${styles.icon}`} />
							</div>
						)}
					>
						<ChapterContent />
					</Accordion>
				</div>
			))}

			<Button
				type="button"
				className={styles.button}
				themeType="secondary"
			>
				+ Chapter
			</Button>
		</div>
	);
}

export default Chapter;
