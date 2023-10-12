import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect, useRef } from 'react';

import useGetMilestoneInfo from '../../../../../../hooks/useGetMilestoneInfo';
import { isCurrentDate, isFutureDate } from '../../../../../../utlis/dateCompare';

import Card from './Card';
import styles from './styles.module.css';

function MilestoneStepper({ combineMileStoneList = [], trackingType = 'air', refetch = () => {} }) {
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
			{combineMileStoneList?.map((combineList, index) => {
				const currentMilestone = (combineList || [])[GLOBAL_CONSTANTS.zeroth_index];

				const isCurrentMilestonePastOrPresent = !isFutureDate(currentMilestone?.event_date);
				const isCurrentMilestonePresent = isCurrentDate(currentMilestone?.event_date);

				return (
					<div key={currentMilestone?.id} className={styles.milestone}>
						<div className={cl`${styles.stepper}
							${isCurrentMilestonePastOrPresent ? styles.finish_milestone : ''}
							${isCurrentMilestonePresent ? styles.curr_milestone : ''}`}
						>
							<div className={styles.dot} />
							{index
							!== combineMileStoneListLength - GLOBAL_CONSTANTS.one
							&& <div className={styles.line} />}
						</div>
						<div
							className={styles.card_container}
							ref={(r) => {
								scrollRef.current[index] = r;
							}}
						>
							<Card
								combineList={combineList}
								refetch={refetch}
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
