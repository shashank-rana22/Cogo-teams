import React from 'react';
import { isEmpty, lowerFirst } from '@cogoport/front/utils';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import getGeoConstants from '@cogo/globalization/constants/geo';
import styles from './styles.module.css'
const geo = getGeoConstants();

const MailStatus = ({ list = [] }) => {
	let date = '';
	const renderTemplate = list[0] || {};

	const priorityArray = [
		'is_blocked',
		'is_spammed',
		'is_bounced',
		'is_clicked',
		'is_seen',
	];
	const status = {};
	let not_found = true;
	priorityArray.forEach((item) => {
		if (renderTemplate[item] && not_found) {
			status.key = lowerFirst(item?.split('_')[1]);
			date = renderTemplate[`${status.key}_at`];
			not_found = false;
			return status;
		}
		return undefined;
	});

	if (isEmpty(status)) {
		return null;
	}
	let isSuccess = true;
	if (status.key === 'spammed' || status.key === 'blocked') {
		isSuccess = false;
	}

	return (
		<div className={isSuccess ? 'green' : 'red'} className={styles.container}>
			This email has been {status.key} on{' '}
			{formatDate({
				date,
				dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat: geo.formats.time['12hrs'],
				formatType: 'dateTime',
				separator: ' at ',
			})}
		</div>
	);
};

export default MailStatus;
