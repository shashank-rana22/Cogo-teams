import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DetentionAndDemurrage({ item = {} }) {
	const { freight_service, local_service } = item;

	const primary_service = isEmpty(freight_service) ? local_service : freight_service;

	const {
		free_days_demurrage_destination,
		free_days_demurrage_origin,
		free_days_detention_destination,
		free_days_detention_origin,
	} = primary_service || {};

	return (
		<div className={styles.detention_demurrage}>
			<span>
								&nbsp; Origin: &nbsp;
				{free_days_detention_origin || 0}
								&nbsp; Detention days , &nbsp;
				{free_days_demurrage_origin || 0}
								&nbsp; Demurrage Days
			</span>
			<br />
			<span>
								&nbsp; Destination: &nbsp;
				{free_days_detention_destination || 0}
								&nbsp; Detention days, &nbsp;
				{free_days_demurrage_destination || 0}
								&nbsp; Demurrage days &nbsp;
			</span>
		</div>
	);
}

export default DetentionAndDemurrage;
