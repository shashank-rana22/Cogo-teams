import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const MIN_LENGTH = 1;

function PrintTruckTypes({ detail = {} }) {
	if (detail?.truck_types?.length > MIN_LENGTH) {
		return (
			<div style={{ display: 'flex' }}>
				{startCase(detail?.truck_types?.[GLOBAL_CONSTANTS.zeroth_index])}
				{' '}
				<Tooltip
					placement="bottom"
					content={(
						<div style={{ fontSize: '10px' }}>
							{detail?.truck_types?.slice(MIN_LENGTH)?.map((item) => (
								<div key={item}>{startCase(item)}</div>
							))}
						</div>
					)}
				>
					<div className={styles.cargo_details_info}>
						{`+ ${
							(detail?.truck_types?.length || MIN_LENGTH) - MIN_LENGTH
						} more`}

					</div>
				</Tooltip>
			</div>
		);
	}

	return <div>{startCase(detail?.truck_types?.[GLOBAL_CONSTANTS.zeroth_index])}</div>;
}

export default PrintTruckTypes;
