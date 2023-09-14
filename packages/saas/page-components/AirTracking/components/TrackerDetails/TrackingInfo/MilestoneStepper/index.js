import { cl } from '@cogoport/components';
import { useEffect, useRef } from 'react';

import useGetMilestoneInfo from '../../../../hooks/useGetMilestoneInfo';
import { isCurrentDate, isFutureDate } from '../../../../utils/dateCompare';

import Card from './Card';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const LAST_INDEX = -1;

function MilestoneStepper({ combineMileStoneList = [], trackingType = 'ocean' }) {
	const scrollRef = useRef({});

	const {
		currentMilestoneIndex,
		combineMileStoneListLength, milestoneSubIndex,
	} = useGetMilestoneInfo({ combineMileStoneList });

	useEffect(() => {
		if (currentMilestoneIndex) {
			scrollRef.current[currentMilestoneIndex].scrollIntoView({ behavior: 'smooth' });
		}
	}, [currentMilestoneIndex]);

	return (
		<div className={styles.container}>
			{combineMileStoneList.map((combineList, index) => {
				const currentMilestone = (combineList || []).slice(LAST_INDEX)[GLOBAL_CONSTANTS.zeroth_index];

				const isCurrentMilestonePastOrPresent = !isFutureDate(currentMilestone?.event_date);
				const isCurrentMilestonePresent = isCurrentDate(currentMilestone?.event_date);

				return (
					<div key={currentMilestone?.id} className={styles.milestone}>
						<div className={cl`${styles.stepper}
							${isCurrentMilestonePastOrPresent ? styles.finish_milestone : ''}
							${isCurrentMilestonePresent ? styles.curr_milestone : ''}`}
						>
							<div className={styles.dot} />
							{index !== combineMileStoneListLength - 1 && <div className={styles.line} />}
						</div>
						<div
							className={styles.card_container}
							ref={(r) => {
								scrollRef.current[index] = r;
							}}
						>
							<Card
								combineList={combineList}
								trackingType={trackingType}
								isCurrentMilestone={index === currentMilestoneIndex}
								milestoneSubIndex={milestoneSubIndex}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default MilestoneStepper;
