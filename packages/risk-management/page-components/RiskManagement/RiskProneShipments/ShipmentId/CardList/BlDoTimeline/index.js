import React, { useEffect } from 'react';

import BlDoLoader from '../../../../common/BlDoLoader';
import useGetBlDoTimeline from '../../../../hooks/useGetBlDoTimeline';

import BlDoTimeLineItem from './BlDoTimeLineItem';
import styles from './styles.module.css';

function BlDoTimeline({ itemData, isAccordionActive }) {
	const { blDoTimelineLoading, blDoTimelineData, getblDoTimeline } = useGetBlDoTimeline({ itemData });
	useEffect(() => {
		if (isAccordionActive && itemData?.id) {
			getblDoTimeline();
		}
	}, [getblDoTimeline, isAccordionActive, itemData?.id]);
	return (
		<div className={styles.div_container}>
			<div className={styles.container}>
				{blDoTimelineLoading ? <BlDoLoader />
					: (
						<BlDoTimeLineItem
							blDoTimelineLoading={blDoTimelineLoading}
							blDoTimelineData={blDoTimelineData}
							isAccordionActive={isAccordionActive}
						/>
					)}
			</div>
		</div>
	);
}

export default BlDoTimeline;
