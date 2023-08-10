import { Pill, Accordion, Button } from '@cogoport/components';
import { IcMDelete, IcMDrag } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../../../../commons/EmptyState';
import LoadingState from '../../../../../../../../../commons/LoadingState';
import DeleteModal from '../DeleteModal';

import ChapterContent from './ChapterContent';
import styles from './styles.module.css';
import useHandleChapter from './useHandleChapter';

const VALUE_TO_INDEX_DIFF = 1;

function Chapter({
	subModule,
	handleDragStart,
	handleDragOver,
	handleDrop,
	getLoading,
	getCourseModuleDetails,
	getSubModuleRefetch,
	setGetSubModuleRefetch,
	showButtons,
	state,
	setOpenDetails,
	moduleId,
}) {
	const {
		chapterLoading,
		deleteChapter,
		addNewChapter,
		onSaveChapter,
		subModuleChapters,
		subModuleId,
		getCourseSubModuleLoading,
		deleteLoading,
		showDeleteModal,
		setShowDeleteModal,
		deleteContent,
		setDeleteContent,
	} = useHandleChapter({
		subModule,
		getLoading,
		getCourseModuleDetails,
		getSubModuleRefetch,
		setGetSubModuleRefetch,
		showButtons,
		setOpenDetails,
		moduleId,
	});

	if (getCourseSubModuleLoading || deleteLoading) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(subModuleChapters)) {
		return <EmptyState emptyText="No chapters found" />;
	}

	return (
		<div style={{ padding: '16px 20px' }}>
			{subModuleChapters.map((child, index) => (
				<div key={child.id} className={styles.child_accordian}>
					<Accordion
						type="text"
						isOpen={child.isNew}
						title={(
							<div
								key={child.id}
								draggable={showButtons}
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
									{`Chapter ${index + VALUE_TO_INDEX_DIFF}:`}
									{' '}
									<b className={styles.name}>{child.name}</b>
								</div>

								{showButtons ? (
									<IcMDelete
										onClick={(e) => {
											e.stopPropagation();
											setShowDeleteModal(true);
											setDeleteContent(child);
										}}
										className={`${styles.left} ${styles.icon}`}
									/>
								) : null}

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
							showButtons={showButtons}
							state={state}
						/>
					</Accordion>
				</div>
			))}

			{showDeleteModal ? (
				<DeleteModal
					showDeleteModal={showDeleteModal}
					setShowDeleteModal={setShowDeleteModal}
					deleteLoading={deleteLoading}
					onClickDelete={deleteChapter}
					viewType="chapter"
					deleteProps={{ child: deleteContent, length: subModuleChapters.length }}
				/>
			) : null}

			{showButtons ? (
				<Button
					type="button"
					className={styles.button}
					themeType="secondary"
					onClick={addNewChapter}
					disabled={subModuleChapters[subModuleChapters.length - VALUE_TO_INDEX_DIFF].isNew}
				>
					+ Chapter
				</Button>
			) : null}
		</div>
	);
}

export default Chapter;
