import { Button, Datepicker } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { differenceInDays } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import usePlanValidity from '../../../../../hooks/usePlanValidity';

import styles from './styles.module.css';

function PlanValidity({ extraInfo = {}, modalChangeHandler }) {
	const { t } = useTranslation(['saasSubscription']);

	const { id = '', start_date = '', end_date = '' } = extraInfo || {};

	const [endDate, setEndDate] = useState(end_date ? new Date(end_date) : '');

	const { loading, changePlanValidityHandler } = usePlanValidity({ modalChangeHandler });

	return (
		<>
			<div className={styles.container}>

				<div className={styles.flex_box}>
					<div className={styles.col}>
						<p className={styles.label}>Start Date</p>
						<div className={styles.start_date}>
							{formatDate({
								date       : start_date,
								formatType : 'date',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
							})}
						</div>
					</div>

					<div className={styles.seperator}>
						-
					</div>

					<div className={styles.col}>
						<p className={styles.label}>
							{t('saasSubscription:end_date')}
						</p>
						<Datepicker
							placeholder={t('saasSubscription:select_end_date')}
							value={endDate}
							onChange={setEndDate}
						/>
					</div>
				</div>

				<p className={styles.footer_text}>
					{t('saasSubscription:extend_plan')}
					{' '}
					<b>{differenceInDays(new Date(endDate), new Date(start_date)) || 0}</b>
					{' '}
					{t('saasSubscription:days')}
				</p>

			</div>
			<div className={styles.footer}>
				<Button size="sm" themeType="secondary" disabled={loading}>
					{t('saasSubscription:cancel')}
				</Button>

				<Button
					size="sm"
					className={styles.confirm_btn}
					loading={loading}
					onClick={() => {
						changePlanValidityHandler({ id, endDate });
					}}
				>
					{t('saasSubscription:confirm')}
				</Button>
			</div>
		</>
	);
}

export default PlanValidity;
