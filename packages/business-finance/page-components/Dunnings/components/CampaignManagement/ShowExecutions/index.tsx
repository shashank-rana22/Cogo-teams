import { Carousel, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState, useEffect } from 'react';

import useListDunningExecution from '../hooks/useListDunningExecution';
import ShowMore from '../ShowMore';

import styles from './styles.module.css';

function ShowExecutions({ rowId, dropdown }) {
	const [selectedExecution, setSelectedExecution] = useState(0);

	const {
		data:executionListData, loading,
		getDunningExecutions,
	} = useListDunningExecution({ rowId });

	const { totalRecords = 0, list = [] } = executionListData || {};

	let totalSlides = Math.floor(totalRecords / 10);
	if (totalRecords % 10 > 0) {
		totalSlides += 1;
	}

	const CAROUSELDATA = Array(totalSlides).fill('').map((item, index) => ({
		key    : index,
		render : () => (
			<div className={styles.carousel_element}>
				{Array(10).fill('').map((i, position) => {
					const elementPosition = (index * 10) + position;
					const { scheduleRule, status } = list?.[elementPosition] || {};
					const { scheduleTime, scheduleTimeZone } = scheduleRule || {};
					const dateText = list?.[elementPosition]
						?.scheduledAt?.split(' ')?.[GLOBAL_CONSTANTS.zeroth_index];
					const timeText = `${scheduleTime} ${scheduleTimeZone}`;

					return (
						<div
							key={list?.[elementPosition]?.id || position}
							style={{
								borderBottom: elementPosition === selectedExecution
									? '4px solid red' : '1px solid #a8a8a8',
							}}
							className={styles.execution_tabs}
						>
							{ list?.[elementPosition]
								? (
									<button
										onClick={() => setSelectedExecution(elementPosition)}
										style={{
											color: elementPosition === selectedExecution ? 'red' : null,
										}}
										className={styles.tabs_btn}
										disabled={status !== 'COMPLETED'}
									>
										<div>
											{dateText || ''}
										</div>
										<div style={{ fontSize: '10px' }}>
											{`weekDay | ${timeText}`}
										</div>
									</button>
								) : null}
						</div>
					);
				})}
			</div>
		),
	}));

	useEffect(() => {
		if (dropdown === rowId) {
			getDunningExecutions();
		}
	}, [dropdown, rowId, getDunningExecutions]);

	if (dropdown === rowId) {
		return (
			<div className={styles.dropdown_container_visible}>
				<div className={styles.data_container}>
					{!loading ? (
						<div style={{ width: '96%' }}>
							<Carousel size="sm" slides={CAROUSELDATA} showDots={false} showArrow />
							<div>
								<ShowMore
									data={list?.[selectedExecution]}
									selectedExecution={selectedExecution}
								/>
							</div>

						</div>
					) : (
						<div>
							<div style={{ display: 'flex' }}>
								{Array(10).fill('').map(() => (
									<Placeholder
										key="key"
										height="32px"
										width="120px"
										style={{ margin: '0px 20px' }}
									/>
								))}
							</div>
							<div>
								<Placeholder key="key" height="90px" width="100%" style={{ margin: '20px 0px' }} />
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
	return <div className={styles.dropdown_container_invisible} />;
}

export default ShowExecutions;
