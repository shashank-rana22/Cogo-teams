import { Pill, Tooltip } from '@cogoport/components';
import {
	IcMFtick,
	IcMDocument,
	IcMVideoCall,
	IcMPpt,
	IcMText,
} from '@cogoport/icons-react';

import toFixed from '../../../../utils/toFixed';

import styles from './styles.module.css';

const ICON_PROPS = {
	width  : 14,
	height : 14,
	fill   : '#fff',
};

const ICON_MAPPING = {
	document     : <IcMDocument {...ICON_PROPS} />,
	video        : <IcMVideoCall {...ICON_PROPS} />,
	presentation : <IcMPpt {...ICON_PROPS} />,
	text         : <IcMText {...ICON_PROPS} />,
};

const ROUNDOFF_VALUE = 0;

function SubModuleContent({
	data = [],
	moduleIndex,
	setIndexes,
	subModuleIndex,
	chapter = {},
	setStates,
}) {
	return (
		<div
			className={styles.container}
			role="button"
			tabIndex="0"
		>
			{data.map((currChapter, chapterIndex) => (
				<div
					role="presentation"
					key={currChapter?.id}
					className={`${styles.chapter_container} 
								${currChapter.id === chapter.id && styles.active}`}
					onClick={() => {
						setStates({ feedback: false, test: false, Chapter: currChapter });
						setIndexes({
							moduleIndex,
							subModuleIndex,
							chapterIndex,
						});
					}}
				>
					<div className={styles.wrapper}>
						{currChapter.user_progress_state === 'completed' && (
							<IcMFtick
								fill="#849E4C"
								width={24}
								height={24}
								className={styles.icon}
							/>
						)}

						<div className={styles.databox_image}>
							{ICON_MAPPING[currChapter.content_type]}
						</div>

						<div className={styles.tooltip}>
							<Tooltip
								content={`${currChapter.name}`}
								placement="top"
								maxWidth={500}
							>
								<div className={styles.name}>
									{currChapter.name}
									{' '}
								</div>
							</Tooltip>
						</div>
					</div>

					{currChapter.is_updated && (
						<Pill key={chapter.id} size="sm" color="orange">
							NEW
						</Pill>
					)}

					<div className={styles.duration}>
						{toFixed(currChapter.completion_duration_value, ROUNDOFF_VALUE)}
						{' mins'}
					</div>
				</div>
			))}
		</div>
	);
}

export default SubModuleContent;
