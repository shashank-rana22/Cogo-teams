import { IcMFtick, IcMDocument } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SubModuleContent({
	setIndexes, data = [], moduleIndex,
	subModuleIndex, setChapterContent = () => {},
}) {
	return (
		<div className={styles.container}>

			{data.map((chapter, chapterIndex) => (
				<div
					role="presentation"
					key={chapter?.id}
					className={styles.chapter_container}
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
						<div className={styles.number}>
							<div className={styles.icon}>
								<IcMDocument fill="white" />
							</div>
						</div>
						<div className={styles.name}>{chapter.name}</div>
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
