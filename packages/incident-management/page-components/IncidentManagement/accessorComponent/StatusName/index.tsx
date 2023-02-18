import { Tooltip, Pill } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function StatusName({ itemData }) {
	const { userIncidentStatus, status, linkedReferenceId } = itemData || {};
	function TooltipContent() {
		if (status === 'REJECTED' && userIncidentStatus === 'RAISED_AGAIN') {
			return (
				`NEW INCIDENT ID: ${linkedReferenceId}`
			);
		}
		if (status === 'REQUESTED') {
			return (
				`RAISED AGAIN: ${linkedReferenceId}`
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
			{linkedReferenceId && (userIncidentStatus === 'REQUESTED' || userIncidentStatus === 'RAISED_AGAIN') ? (
				<div className={styles.icon_style}>
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
