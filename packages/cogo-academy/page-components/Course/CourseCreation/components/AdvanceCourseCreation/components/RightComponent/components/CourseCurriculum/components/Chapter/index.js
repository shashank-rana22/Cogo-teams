import { Pill, Accordion, Button } from '@cogoport/components';
import { IcMDelete, IcMDrag } from '@cogoport/icons-react';

import LoadingState from '../../../../../../../../../commons/LoadingState';

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
	getSubModuleRefetch,
	setGetSubModuleRefetch,
}) {
	const {
		chapterLoading,
		deleteChapter,
		addNewChapter,
		onSaveChapter,
		subModuleChapters,
		subModuleId,
		getCourseSubModuleLoading,
	} = useHandleChapter({
		subModule,
		getLoading,
		getCourseModuleDetails,
		getSubModuleRefetch,
		setGetSubModuleRefetch,
	});

	if (getCourseSubModuleLoading) {
		return <LoadingState rowsCount={2} />;
	}

	return (
		<div style={{ padding: '16px 20px' }}>
			{subModuleChapters.map((child, index) => (
				<div className={styles.child_accordian}>
					<Accordion
						type="text"
						title={(
							<div
								key={child.id}
								draggable
								onDragStart={(event) => handleDragStart(
									event,
									{
										...child,
										type                : 'chapter',
										start_point_details : {
											start_chapters      : subModuleChapters,
											start_sub_module_id : subModule.id,
										},
									},
									'chapter',
								)}
								onDragOver={(event) => handleDragOver(event)}
								onDrop={(event) => handleDrop(event, {
									...child,
									type              : 'chapter',
									end_point_details : {
										end_chapters      : subModuleChapters,
										end_sub_module_id : subModule.id,
									},
								}, 'chapter')}
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
									color={child.isNew ? '#df8b00' : '#98FB98'}
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
							getCourseSubModuleLoading={getCourseSubModuleLoading}
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
		</div>
	);
}

export default Chapter;
