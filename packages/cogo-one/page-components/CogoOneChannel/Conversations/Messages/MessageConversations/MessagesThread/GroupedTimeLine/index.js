import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDoubleDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import TimeLine from '../../../../../../../common/TimeLine';

import styles from './styles.module.css';

const THRESHOLD_LIMIT = 2;
const INDEX_STEP = 1;

function GroupedTimeLine({ eachMessage = {} }) {
	const [expandedState, setExpandedState] = useState(false);
	const { groupedData = [] } = eachMessage || {};

	return (
		<div className={styles.container}>
			{groupedData.map(
				(itm, index) => {
					if (!expandedState) {
						if (groupedData.length > THRESHOLD_LIMIT && index === groupedData.length - THRESHOLD_LIMIT) {
							return (
								<div
									onClick={() => setExpandedState(true)}
									key={eachMessage?.created_at}
									role="presentation"
									className={styles.grouped_container}
								>
									<IcMArrowDoubleDown />
									{' '}
									see
									{' '}
									{groupedData.length - THRESHOLD_LIMIT}
									{' '}
									more activities.
								</div>
							);
						}

						if (!(index === GLOBAL_CONSTANTS.zeroth_index || index === groupedData.length - INDEX_STEP)) {
							return null;
						}
					}

					return (
						<TimeLine
							key={itm?.created_at}
							eachMessage={itm}
							showHideOption={(groupedData.length > THRESHOLD_LIMIT
											&& expandedState && index === INDEX_STEP)}
							setExpandedState={setExpandedState}
						/>
					);
				},
			)}
		</div>
	);
}

export default GroupedTimeLine;
