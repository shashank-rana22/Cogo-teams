import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const SIX = 6;

function DocumentFlow({
	timelineDetails = [],
}) {
	return (
		<>
			{timelineDetails.map((item) => (
				<div key={item?.occurredAt} style={{ width: '200px' }}>
					<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
						<IcCFtick height="20" width="20" />
						{item !== SIX ? (<div className={styles.horizontal_rule} />) : null}
					</div>
					<div>
						<div>{item?.eventName}</div>
						<div className={styles.occured_at}>
							{format(item?.occurredAt, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'])}
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default DocumentFlow;
