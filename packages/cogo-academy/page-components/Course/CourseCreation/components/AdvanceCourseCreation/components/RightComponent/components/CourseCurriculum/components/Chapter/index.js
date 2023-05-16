import { Pill, Accordion, Button } from '@cogoport/components';
import { IcMDelete, IcMDrag } from '@cogoport/icons-react';

import ChapterContent from './ChapterContent';
import styles from './styles.module.css';
import useHandleChapter from './useHandleChapter';

function Chapter({
	subModule,
	handleDragStart,
	handleDragOver,
	handleDrop,
	getLoading,
	getCourseModuleDetails,
}) {
	const {
		chapterLoading,
		deleteChapter,
		addNewChapter,
		onSaveChapter,
		subModuleChapters,
		subModuleId,
	} = useHandleChapter({
		subModule,
		getLoading,
		getCourseModuleDetails,
	});

	return (
		<>
			{subModuleChapters.map((child, index) => (
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

								<IcMDelete
									onClick={(e) => deleteChapter({ e, child, length: subModuleChapters.length })}
									className={`${styles.left} ${styles.icon}`}
								/>

								<Pill
									style={{ marginLeft: '16px' }}
									size="sm"
									color={child.isNew ? '#df8b00' : '#45f829'}
								>
									{child.isNew ? 'unsaved' : 'saved'}
								</Pill>
							</div>
						)}
					>
						<ChapterContent
							chapterContent={child}
							onSaveChapter={onSaveChapter}
							subModuleId={subModuleId}
							index={index}
							chapterLoading={chapterLoading}
						/>
					</Accordion>
				</div>
			))}

			<Button
				type="button"
				className={styles.button}
				themeType="secondary"
				onClick={addNewChapter}
			>
				+ Chapter
			</Button>
		</>
	);
}

export default Chapter;
