// import { Placeholder } from '@cogoport/components';
// import { IcMDummyCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

// import Timeline from '../../../../../commons/CardContent';
import SellBuyCards from '../../../../../commons/SellBuyCards';

import styles from './styles.module.css';

function FinancialClosedCards({
	type = '',
	data = [],
	// financeCardOpen = {},
	// setFinanceCardOpen = () => {},
	// getClosedTasks = () => {},
	// loading = false,
}) {
	return (
		<div className={styles.single_card}>
			<div className={styles.row}>
				<div className={styles.column}>
					<div className={styles.accordion}>
						<div className={styles.header}>
							<div className={styles.headings}>
								{`Financially Closed ${startCase(type)}`}
								<div className={styles.line} />
							</div>
						</div>

						<SellBuyCards source="FIN" type={type} data={data} />

						{/* {loading ? <Placeholder height="60px" /> : data?.map((item) => (
							<div key={item?.id} style={{ display: 'flex', alignItems: 'center' }}>
								<div className={styles.vertical_timeline}>
									<IcMDummyCircle
										fill="#EE3425"
										height="20"
										width="20"
									/>
									<div className={styles.vertical_rule} />
								</div>
								<Timeline
									data={item}
									type={type}
									financeCardOpen={financeCardOpen}
									source="FIN"
									setFinanceCardOpen={setFinanceCardOpen}
									getClosedTasks={getClosedTasks}
								/>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FinancialClosedCards;
