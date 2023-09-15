import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { pocDetailsFields } from '../../../configurations/poc-details';

import POCDetailsItem from './POCDetailsItem';
import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const FUNCTIONS = {
	handleContact: (singleItem) => (
		<div>
			{singleItem.mobile_country_code}
			{' '}
			{singleItem.mobile_number}
		</div>
	),
};

function POCDetails({ data = {} }) {
	const { t } = useTranslation(['airRepository']);
	const { fields } = pocDetailsFields(t);

	const {
		e_booking_availability: eBooking,
		inventory_stock_availability: availability, pocs_data:pocsData,
		ams_mode: amsMode = 'manual',
	} = data || {};

	return (
		<div className={styles.poc_detail_container}>
			<div className={styles.poc_container}>
				<div className={styles.basic_info}>
					<div className={styles.basic_info_heading}>
						{t('airRepository:e_booking')}
						<span>:</span>
					</div>
					{eBooking === 'available' ? 'Yes' : 'No'}
					<div className={cl`${styles.basic_info_heading} ${styles.inventory}`}>
						{t('airRepository:inventory')}
						<span>:</span>
					</div>
					{availability === 'before_booking' ? t('airRepository:before') : t('airRepository:after')}
					<div className={cl`${styles.basic_info_heading} ${styles.inventory}`}>
						{t('airRepository:ams_mode_field_label')}
						<span>:</span>
					</div>
					{startCase(amsMode) || '-'}

				</div>
				<div className={styles.poc_list}>
					<header className={styles.header}>
						{fields.map((field) => (
							<div
								className={styles.col}
								style={{ '--span': field.span || DEFAULT_SPAN }}
								key={field.key}
							>
								{ field.label }
							</div>
						))}
					</header>
					{(pocsData || []).map((item) => (
						<POCDetailsItem
							item={item}
							fields={fields}
							functions={FUNCTIONS}
							key={JSON.stringify(item)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default POCDetails;
