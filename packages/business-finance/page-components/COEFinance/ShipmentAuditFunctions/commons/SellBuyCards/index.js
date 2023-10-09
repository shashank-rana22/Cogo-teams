import { cl } from '@cogoport/components';
import { IcMDummyCircle, IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import AccordionContent from './AccordionContent';
import styles from './styles.module.css';

const TITLE_MAPPING = {
	FIN : 'FINAL',
	OPR : 'OPERATIONAL',
};

function SellBuyCards({ source = 'FIN', type = '', data = [] }) {
	const [open, setOpen] = useState(false);

	let profitabilityData = 0;
	let grandTotal = 0;

	data.forEach((i) => {
		profitabilityData += i.profitability;
		grandTotal += i.grand_total;
	});

	return (
		<div className={styles.container}>
			<div className={cl`${styles.card_content} ${styles.border}`}>
				<IcMDummyCircle
					fill="#EE3425"
					height="20"
					width="20"
				/>
				<div className={styles.card_container}>
					<div className={styles.title}>{`${TITLE_MAPPING[source]} ${type}`}</div>

					<div className={styles.amount}>
						{type === 'BUY' ? 'Expense' : 'Income'}
						:
						{' '}
						{grandTotal}
					</div>

					<div className={styles.profitability_content}>
						Profitability:
						{' '}
						{profitabilityData}
					</div>

					{open ? (
						<IcMArrowRotateUp
							style={{ cursor: 'pointer' }}
							onClick={() => setOpen(false)}
						/>
					)
						: (
							<IcMArrowRotateDown
								style={{ cursor: 'pointer' }}
								onClick={() => setOpen(true)}
							/>
						)}
				</div>
			</div>

			{open ? <AccordionContent data={data} /> : null}

		</div>
	);
}

export default SellBuyCards;
