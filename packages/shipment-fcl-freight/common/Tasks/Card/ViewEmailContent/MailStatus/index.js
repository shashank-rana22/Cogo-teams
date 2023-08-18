import { cl } from '@cogoport/components';
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

const NOT_SUCCESS = ['spammed', 'blocked'];

function MailStatus({ list = [] }) {
	const renderTemplate = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const STATUS = {};

	PRIORITY_ARRAY.some((item) => {
		if (renderTemplate[item]) {
			STATUS.key = item?.split('_')[FIRST_INDEX];
			STATUS.date = renderTemplate[`${STATUS.key}_at`];
			return true;
		}
		return false;
	});

	if (isEmpty(STATUS)) {
		return null;
	}

	const isSuccess = !NOT_SUCCESS.includes(STATUS.key);

	return (
		<div
			className={cl` ${styles.container} ${isSuccess ? styles.success : styles.not_success}`}
		>
			{`This email has been ${STATUS.key} on 
            ${formatDate({
				date       : STATUS?.date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : geo.formats.time['12hrs'],
				formatType : 'dateTime',
				separator  : ' at ',
			})}`}
		</div>
	);
}

export default MailStatus;
