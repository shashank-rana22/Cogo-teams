import { Placeholder } from '@cogoport/components';
import { IcMDummyCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import SellBuyCards from '../../../../../commons/SellBuyCards';
import { getCircleColor } from '../../../../../utils/getStyleAttributes';

import styles from './styles.module.css';

function OperationalClosedCards({
	type = '',
	data = [],
	loading = false,
	getClosedTasks = () => {},
	shipment_id = '',
}) {
	const finalStatus = data?.every((i) => i?.quotation_state === 'APPROVED');
	return (
		<div className={styles.single_card}>
			<div className={styles.row}>
				<div className={styles.column}>
					<div className={styles.accordion}>
						<div className={styles.header}>
							<div className={styles.headings}>
								{`Operationally Closed ${startCase(type)}`}
								<div className={styles.line} />
							</div>
						</div>
						{loading ? <Placeholder height="60px" />
							: (
								<div style={{ display: 'flex', width: '100%' }}>
									<div className={styles.vertical_timeline}>
										<IcMDummyCircle
											fill={getCircleColor(
												finalStatus,
											)}
											height="20"
											width="20"
											style={{ marginBottom: '24px' }}
										/>
									</div>

									<SellBuyCards
										source="OPR"
										type={type}
										shipment_id={shipment_id}
										data={data}
										loading={loading}
										getClosedTasks={getClosedTasks}
									/>
								</div>
							)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default OperationalClosedCards;
