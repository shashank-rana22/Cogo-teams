import { cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

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
	const geo = getGeoConstants();

	const STATUS = {};
	let notFound = true;

	PRIORITY_ARRAY.forEach((item) => {
		if (renderTemplate[item] && notFound) {
			STATUS.key = (item?.split('_')[FIRST_INDEX]);
			date = renderTemplate[`${STATUS.key}_at`];
			notFound = false;
			return STATUS;
		}
		return undefined;
	});

	if (isEmpty(STATUS)) {
		return undefined;
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
