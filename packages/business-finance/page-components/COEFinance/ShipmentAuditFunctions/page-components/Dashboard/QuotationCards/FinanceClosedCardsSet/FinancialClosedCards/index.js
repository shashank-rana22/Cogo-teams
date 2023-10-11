import { Placeholder } from '@cogoport/components';
import { IcMDummyCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import SellBuyCards from '../../../../../commons/SellBuyCards';

import styles from './styles.module.css';

function FinancialClosedCards({
	type = '',
	data = [],
	loading = false,
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

						{loading ? <Placeholder height="60px" />
							: (
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<div className={styles.vertical_timeline}>
										<IcMDummyCircle
											fill="#EE3425"
											height="20"
											width="20"
										/>
										<div className={styles.vertical_rule} />
									</div>
									<SellBuyCards
										source="FIN"
										type={type}
										data={data}
										loading={loading}
									/>
								</div>
							)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FinancialClosedCards;
