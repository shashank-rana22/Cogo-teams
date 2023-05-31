import { IcMFtick, IcMDocument } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SubModuleContent({
	data = [], moduleIndex, indexes, setIndexes,
	subModuleIndex, setChapterContent = () => {},
}) {
	return (
		<div className={styles.container}>

			{data.map((chapter, chapterIndex) => (
				<div
					role="presentation"
					key={chapter?.id}
					className={`${styles.chapter_container} 
								${(indexes.chapterIndex === chapterIndex) && styles.active}`}
					onClick={() => {
						setChapterContent(chapter);

						setIndexes({
							moduleIndex,
							subModuleIndex,
							chapterIndex,
						});
					}}
				>
					<div className={styles.wrapper}>
						{chapter.user_progress_state === 'completed'
						&& <IcMFtick fill="#849E4C" width={24} height={24} />}

						<IcMDocument width={20} height={20} className={styles.icon} />

						{/* <div className={styles.number}>
							IcMDocument
							<div className={styles.icon}>
								<IcMDocument fill="white" />
							</div>
						</div> */}
						<div className={styles.name}>
							{chapter.name}
						</div>
					</div>

					<div className={styles.duration}>
						{chapter.completion_duration_value}
						{' mins'}
					</div>

				</div>
			))}

		</div>
	);
}

export default SubModuleContent;
