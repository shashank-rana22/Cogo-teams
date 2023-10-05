import { IcMDummyCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Timeline from '../../Timeline';

import styles from './styles.module.css';

function FinancialClosedCards({
	type = '',
	data = {},
	financeCardOpen = {},
	setFinanceCardOpen = () => {},
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
						{data?.map((item) => (
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
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FinancialClosedCards;
