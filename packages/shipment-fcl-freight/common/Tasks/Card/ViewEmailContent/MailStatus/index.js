import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const geo = getGeoConstants();
const FIRST_INDEX = 1;

const PRIORITY_ARRAY = [
	'is_blocked',
	'is_spammed',
	'is_bounced',
	'is_clicked',
	'is_seen',
];

function MailStatus({ list = [] }) {
	let date = '';
	const renderTemplate = list[GLOBAL_CONSTANTS.zeroth_index] || {};

	const STATUS = {};
	let not_found = true;

	PRIORITY_ARRAY.forEach((item) => {
		if (renderTemplate[item] && not_found) {
			STATUS.key = item?.split('_')[FIRST_INDEX];
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
		<div className={styles.container} style={{ color: isSuccess ? '#358856' : '#ff0000' }}>
			{`This email has been ${STATUS.key} on 
            ${formatDate({
				date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : geo.formats.time['12hrs'],
				formatType : 'dateTime',
				separator  : ' at ',
			})}`}
		</div>
	);
}

export default MailStatus;
