import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const DATA = [
	{ name: 'Irregular Payments', subhead: 'Pay employees quickly', value: 'irregular_payments' },
	{ name: 'Bonus', subhead: 'Manage employee bonus', value: 'bonuses' },
];

function RelatedLinks() {
	const router = useRouter();
	return (
		<div className={styles.main_container}>
			{DATA.map((item) => (
				<div
					aria-hidden
					key={item.name}
					className={styles.card_component}
					onClick={() => router.push(`/payroll/manage?type=${item.value}`)}
					style={{ cursor: 'pointer' }}
				>
					<div
						className={styles.text_container}
					>
						{' '}
						<span className={styles.text_head}>{item.name}</span>
						<span className={styles.text_subhead}>{item.subhead}</span>
					</div>
					<IcMArrowRight />
				</div>
			))}
		</div>
	);
}

export default RelatedLinks;
