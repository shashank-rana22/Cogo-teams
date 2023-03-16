import { IcMArrowNext } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';
import TotalPayables from './TotalPayables';

function Dashboard() {
	const [payablesFilter, setPayablesFilter] = useState('overall');
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.box}>
					<div className={styles.sub_container}>
						<div className={styles.label_text}>
							INR
						</div>
						<div className={styles.value_text}>
							50.12 Cr
						</div>
						<div className={styles.vr} />
						<div className={styles.account_payables}>
							<div className={styles.label_text}>
								Account Payables
							</div>
							<div className={styles.invoices_org}>
								Open Invoices - 123 | Organizations - 180
							</div>
						</div>
					</div>

				</div>
				<div className={styles.box}>
					<div className={styles.sub_container}>
						<div className={styles.label_text}>
							INR
						</div>
						<div className={styles.value_text}>
							60.24 Cr
						</div>
						<div className={styles.account_payables}>
							<div className={styles.label_text}>
								Open Invoices
							</div>
							<div className={styles.percentage_text}>
								<div className={styles.profit_icon}>
									<IcMArrowNext height={20} width={20} />
								</div>
								+ 1.01% this week
							</div>
						</div>
					</div>
				</div>
				<div className={styles.box}>
					<div className={styles.sub_container}>
						<div className={styles.label_text}>
							INR
						</div>
						<div className={styles.value_text}>
							10.12 Cr
						</div>
						<div className={styles.account_payables}>
							<div className={styles.label_text}>
								On Account Payment
							</div>
							<div className={styles.percentage_text}>
								<div className={styles.profit_icon}>
									<IcMArrowNext height={20} width={20} />
								</div>
								+ 1.01% this week
							</div>
						</div>
					</div>
				</div>
			</div>
			<TotalPayables payablesFilter={payablesFilter} setPayablesFilter={setPayablesFilter} />

		</div>
	);
}

export default Dashboard;
