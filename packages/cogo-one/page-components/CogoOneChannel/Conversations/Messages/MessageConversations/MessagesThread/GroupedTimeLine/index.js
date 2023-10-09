import { IcMArrowDoubleDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import TimeLine from '../../../../../../../common/TimeLine';

import styles from './styles.module.css';

function GroupedTimeLine({ eachMessage = {} }) {
	const [expandedState, setExpandedState] = useState(false);
	const { groupedData = [] } = eachMessage || {};

	return (
		<div className={styles.container}>
			{groupedData.map(
				(itm, index) => {
					if (!expandedState) {
						if (groupedData.length > 2 && index === groupedData.length - 2) {
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
									{groupedData.length - 2}
									{' '}
									more activities.
								</div>
							);
						}

						if (!(index === 0 || index === groupedData.length - 1)) {
							return null;
						}
					}

					return (
						<TimeLine
							key={itm?.created_at}
							eachMessage={itm}
							showHideOption={groupedData.length > 2 && expandedState && index === 1}
							setExpandedState={setExpandedState}
						/>
					);
				},
			)}
		</div>
	);
}

export default GroupedTimeLine;
