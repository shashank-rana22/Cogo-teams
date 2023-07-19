import { cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function MailStatus({ list = [] }) {
	let date = '';
	const renderTemplate = list[GLOBAL_CONSTANTS.zeroth_index] || {};
	const geo = getGeoConstants();

	const priorityArray = [
		'is_blocked',
		'is_spammed',
		'is_bounced',
		'is_clicked',
		'is_seen',
	];

	const STATUS = {};
	let not_found = true;
	priorityArray.forEach((item) => {
		if (renderTemplate[item] && not_found) {
			STATUS.key = (item?.split('_')[FIRST_INDEX]);
			date = renderTemplate[`${STATUS.key}_at`];
			not_found = false;
			return STATUS;
		}
		return undefined;
	});

	if (isEmpty(STATUS)) {
		return null;
	}
	let isSuccess = true;
	if (STATUS.key === 'spammed' || STATUS.key === 'blocked') {
		isSuccess = false;
	}

	return (
		<div className={cl`${isSuccess ? styles.green_style : styles.red_style} ${styles.container}`}>
			This email has been
			{' '}
			{STATUS.key}
			{' '}
			on
			{' '}
			{formatDate({
				date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : geo.formats.time['12hrs'],
				formatType : 'dateTime',
				separator  : ' at ',
			})}
		</div>
	);
}

export default MailStatus;
