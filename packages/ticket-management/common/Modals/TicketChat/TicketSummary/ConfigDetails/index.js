import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ConfigDetails({
	t = () => {},
	category = '',
	subCategory = '',
	raisedToDesk = '',
	raisedByDesk = '',
	isCategoryConfig = '',
}) {
	return (
		<>
			{isCategoryConfig && category && (
				<div className={styles.ticket_data}>
					{t('myTickets:category')}
					:
					<span className={styles.updated_at}>
						{startCase(category)}
					</span>
				</div>
			)}
			{isCategoryConfig && subCategory && (
				<div className={styles.ticket_data}>
					{t('myTickets:sub_category')}
					:
					<span className={styles.updated_at}>
						{startCase(subCategory)}
					</span>
				</div>
			)}
			{!isCategoryConfig && raisedByDesk && (
				<div className={styles.ticket_data}>
					{t('myTickets:raised_by_desk')}
					:
					<span className={styles.updated_at}>
						{startCase(raisedByDesk)}
					</span>
				</div>
			)}
			{!isCategoryConfig && raisedToDesk && (
				<div className={styles.ticket_data}>
					{t('myTickets:raised_to_desk')}
					:
					<span className={styles.updated_at}>
						{startCase(raisedToDesk)}
					</span>
				</div>
			)}

		</>
	);
}

export default ConfigDetails;
