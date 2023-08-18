import { Carousel, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useListDunningExecution from '../hooks/useListDunningExecution';
import ShowMore from '../ShowMore';

import styles from './styles.module.css';

const SINGLE_SLIDE_LIMIT = 10;
const INCREMENT = 1;
const WEEK_SLICE_FROM = 0;
const WEEK_SLICE_TILL = 3;
const DEFAULT_VALUE = 0;

function ShowExecutions({ rowId = '', dropdown = '' }) {
	const [selectedExecution, setSelectedExecution] = useState(DEFAULT_VALUE);

	const {
		data:executionListData, loading,
		getDunningExecutions,
	} = useListDunningExecution({ rowId });

	const { totalRecords = 0, list = [] } = executionListData || {};

	let totalSlides = Math.floor(totalRecords / SINGLE_SLIDE_LIMIT);
	if (totalRecords % SINGLE_SLIDE_LIMIT > DEFAULT_VALUE) {
		totalSlides += INCREMENT;
	}

	const CAROUSELDATA = [...Array(totalSlides).keys()].map((item, index) => ({
		key    : item,
		render : () => (
			<div className={styles.carousel_element}>
				{Array(SINGLE_SLIDE_LIMIT).fill('').map((i, position) => {
					const elementPosition = (index * SINGLE_SLIDE_LIMIT) + position;
					const { scheduleRule, status } = list?.[elementPosition] || {};
					const { scheduleTime, scheduleTimeZone, week, dunningExecutionFrequency = '' } = scheduleRule || {};
					const dateText = list?.[elementPosition]
						?.scheduledAt?.split(' ')?.[GLOBAL_CONSTANTS.zeroth_index];
					const timeText = `${scheduleTime} ${scheduleTimeZone}`;
					const executionDay = week ? week?.slice(WEEK_SLICE_FROM, WEEK_SLICE_TILL)
						: dunningExecutionFrequency?.replaceAll('_', ' ');

					return (
						<div
							key={list?.[elementPosition]?.id}
							style={{
								borderBottom: elementPosition === selectedExecution
									? '4px solid #ee3425' : '1px solid #a8a8a8',
							}}
							className={styles.execution_tabs}
						>
							{ list?.[elementPosition]
								? (
									<button
										onClick={() => setSelectedExecution(elementPosition)}
										style={{
											color: elementPosition === selectedExecution ? '#ee3425' : null,
										}}
										className={styles.tabs_btn}
										disabled={status !== 'COMPLETED'}
									>
										<div>
											{dateText || ''}
										</div>
										<div style={{ fontSize: '10px' }}>
											{executionDay
												? `${startCase(executionDay.toLowerCase())} | `
												: null}
											{timeText}
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
								{[...Array(SINGLE_SLIDE_LIMIT).keys()].map((item) => (
									<Placeholder
										key={item}
										height="32px"
										width="120px"
										style={{ margin: '0px 20px' }}
									/>
								))}
							</div>
							<div>
								<Placeholder height="90px" width="100%" style={{ margin: '20px 0px' }} />
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
