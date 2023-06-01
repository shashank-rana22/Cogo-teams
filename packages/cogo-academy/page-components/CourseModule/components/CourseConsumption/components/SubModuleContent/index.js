import { IcMFtick, IcMDocument, IcMVideoCall, IcMPpt, IcMText } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SubModuleContent({
	data = [], moduleIndex, setIndexes,
	subModuleIndex, chapter = {}, setChapter = () => {},
}) {
	const ICON_MAPPING = {
		document     : <IcMDocument width={14} height={14} fill="white" />,
		video        : <IcMVideoCall width={14} height={14} fill="white" />,
		presentation : <IcMPpt width={14} height={14} fill="white" />,
		text         : <IcMText width={14} height={14} fill="white" />,
	};

	return (
		<div className={styles.container}>

			{data.map((currChapter, chapterIndex) => (
				<div
					role="presentation"
					key={currChapter?.id}
					className={`${styles.chapter_container} 
								${(currChapter.id === chapter.id) && styles.active}`}
					onClick={() => {
						setChapter(currChapter);

						setIndexes({
							moduleIndex,
							subModuleIndex,
							chapterIndex,
						});
					}}
				>
					<div className={styles.wrapper}>

						{currChapter.user_progress_state === 'completed'
						&& <IcMFtick fill="#849E4C" width={24} height={24} className={styles.icon} />}

						<div className={styles.databox_image}>
							{ICON_MAPPING[currChapter.content_type]}
						</div>

						<div className={styles.name}>
							{currChapter.name}
						</div>
					</div>

					<div className={styles.duration}>
						{currChapter.completion_duration_value}
						{' mins'}
					</div>

				</div>
			))}

		</div>
	);
}

export default SubModuleContent;
