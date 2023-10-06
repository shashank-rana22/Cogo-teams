import { Placeholder } from '@cogoport/components';
import { IcMDummyCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Timeline from '../../../../../commons/CardContent';

import styles from './styles.module.css';

function OperationalClosedCards({
	type = '',
	data = [],
	operationCardOpen = {},
	setOperationCardOpen = () => {},
	loading = false,
	getClosedTasks = () => {},
}) {
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
						{loading ? <Placeholder height="60px" /> : data?.map((item) => (
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
									source="OPR"
									operationCardOpen={operationCardOpen}
									setOperationCardOpen={setOperationCardOpen}
									getClosedTasks={getClosedTasks}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default OperationalClosedCards;
