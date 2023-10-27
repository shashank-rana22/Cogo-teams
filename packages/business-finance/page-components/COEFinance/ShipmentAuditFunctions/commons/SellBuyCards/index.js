import { Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateUp, IcMArrowRotateDown, IcCFtick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import Content from './Content';
import styles from './styles.module.css';

const TITLE_MAPPING = {
	FIN : 'Final',
	OPR : 'Operational',
};

const checkIsApproved = (data = []) => data?.every((item) => item?.quotation_state === 'APPROVED');

const ZERO_VALUE = 0;

function SellBuyCards({
	source = 'FIN',
	type = '',
	data = [],
	loading = false,
	shipment_id = '',
	getClosedTasks = () => {},
}) {
	const [open, setOpen] = useState(false);
	const currency = window.sessionStorage.getItem('currency');

	let profitabilityData = 0;
	let grandTotal = 0;

	data?.forEach((i) => {
		profitabilityData = i.profitability;
		grandTotal += i.grand_total;
	});

	return (
		<div className={styles.custom_accordion}>
			{loading ? <Placeholder /> : (
				<div>
					<div className={styles.accord_title}>
						<div className={styles.status}>
							<div className={styles.accordion_title}>
								{`${TITLE_MAPPING[source]} ${startCase(type)}`}
							</div>

							{!isEmpty(data) && checkIsApproved(data) ? <IcCFtick /> : null}
						</div>

						<div className={`${open ? styles.nothing : styles.other_title}`}>
							<div className={styles.regular}>
								{type === 'buy' ? 'Expense: ' : 'Income: '}
							</div>
							<div>
								{formatAmount({
									amount  : grandTotal,
									currency,
									options : {
										currencyDisplay : 'code',
										style           : 'currency',
									},
								})}
							</div>
						</div>
						<div className={`${open ? styles.nothing : styles.other_title}`}>
							<div className={styles.regular}>Profitability:</div>
							<div className={`${profitabilityData > ZERO_VALUE ? styles.green : styles.red}`}>
								{profitabilityData.toFixed(2)}
							</div>
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
					<div className={`${!open ? styles.nothing : styles.content}`}>
						<Content
							data={data}
							loading={loading}
							income={grandTotal}
							source={source}
							type={type}
							shipment_id={shipment_id}
							profitability={profitabilityData}
							getClosedTasks={getClosedTasks}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default SellBuyCards;
