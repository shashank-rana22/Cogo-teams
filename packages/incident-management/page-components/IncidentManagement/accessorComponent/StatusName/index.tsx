import { Tooltip, Pill } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function StatusName({ itemData }) {
	const { userIncidentStatus, status, referenceIncidentId } = itemData || {};
	function TooltipContent() {
		if (status === 'REJECTED' && userIncidentStatus === 'RAISED_AGAIN') {
			return (
				`NEW INCIDENT ID: ${referenceIncidentId}`
			);
		}
		if (status === 'REQUESTED') {
			return (
				`RAISED AGAIN: ${referenceIncidentId}`
			);
		}
		return null;
	}
	return (
		<div className={styles.container}>
			{userIncidentStatus === 'DELETED' || userIncidentStatus === 'RAISED_AGAIN'
				? (
					<Pill color="#FEF199">
						{startCase(userIncidentStatus)}
					</Pill>
				)

				: (
					<Pill color="#CFEAED">
						{startCase(userIncidentStatus)}
					</Pill>
				)}
			{referenceIncidentId && (userIncidentStatus === 'REQUESTED' || userIncidentStatus === 'RAISED_AGAIN') ? (
				<div className={styles.iconStyle}>
					<Tooltip content={TooltipContent()} placement="top" interactive>
						<IcMInfo
							height={15}
							width={15}
							color="#EE3425"
						/>
					</Tooltip>
				</div>
			) : null}
		</div>
	);
}

export default StatusName;
