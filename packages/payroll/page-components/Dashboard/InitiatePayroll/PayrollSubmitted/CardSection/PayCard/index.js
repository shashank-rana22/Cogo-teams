import React from 'react';

import styles from './styles.module.css';

const DOLLARIMAGE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/yellow_dollar_payroll.svg';

function PayCard({ title, subtitle }) {
	return (
		<div className={styles.card}>
			<img src={DOLLARIMAGE} alt="yello_dollar" />
			<span className={styles.card_title}>{title}</span>
			<span className={styles.card_sub_title}>{subtitle}</span>

		</div>

	);
}

export default PayCard;
