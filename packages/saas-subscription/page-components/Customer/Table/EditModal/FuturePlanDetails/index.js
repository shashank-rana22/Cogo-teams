import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function FuturePlanDetails({ future = {}, currentTab }) {
	const { start_date = '', pricing = {} } = future || {};
	const { name = '' } = pricing || {};

	const { t } = useTranslation(['saasSubscription']);

	if (isEmpty(future)) {
		return <EmptyState currentTab={currentTab} />;
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{t('saasSubscription:future_plan_title')}</h3>

			<div className={styles.detail_container}>
				<Pill color="orange">{name}</Pill>
				<div className={styles.date_container}>
					<div className={styles.date_title}>Start Date:</div>
					<div className={styles.date_title}>
						{formatDate({
							date       : start_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
							formatType : 'date',
						})}

					</div>
				</div>
			</div>

		</div>

	);
}

export default FuturePlanDetails;
