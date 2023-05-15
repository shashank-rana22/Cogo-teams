import { Accordion, Button } from '@cogoport/components';
import { IcMDelete, IcMDrag, IcMEdit } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ChapterContent from './ChapterContent';
import styles from './styles.module.css';

function Chapter({ subModule, handleDragStart, handleDragOver, handleDrop }) {
	const { course_sub_module_chapters } = subModule || {};

	const [SubModuleChapters, setSubModuleChapters] = useState(course_sub_module_chapters);

	if (isEmpty(SubModuleChapters)) {
		setSubModuleChapters([{ id: new Date().getTime(), name: '', isNew: true }]);
	}

	return (
		<>
			{SubModuleChapters.map((child, index) => (
				<div className={styles.child_accordian}>
					<Accordion
						type="text"
						isOpen={child.isNew}
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
		</>
	);
}

export default Chapter;
