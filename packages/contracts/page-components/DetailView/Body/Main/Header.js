import { Pill, Button } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Line from '../../../../common/Line';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';

import styles from './styles.module.css';

function Header({ activePair, statsData, handleUpdateContract, data }) {
	const keys = ['commodity', 'container_size', 'container_type', 'trade_type', 'containers_count', 'inco_term'];
	const keysToMap = { container_size: 'ft', containers_count: 'Container' };
	const originCode = activePair?.origin_code;
	const originName = activePair?.origin?.split('(')[0];
	const destinationCode = activePair?.destination_code;
	const destinationName = activePair?.destination?.split('(')[0];
	return (
		<div className={styles.heading}>
			<div className={styles.port_pair}>

				<div>
					{`${originName}(${originCode})`}
				</div>
				<IcMPortArrow />
				<div>
					{`${destinationName}(${destinationCode})`}
				</div>
			</div>

			<div className={styles.pills}>
				{keys.map((item) => (
					<div>
						{activePair[item] ? (
							<Pill
								size="md"
								color="#DFE1EF"
							>
								{Object.keys(keysToMap).includes(item)
									? `${activePair[item]} ${keysToMap[item]}`
									: startCase(activePair[item])}
							</Pill>
						) : null}
					</div>
				))}
			</div>
			<div className={styles.actions}>
				<div className={styles.stats}>
					<div>
						{activePair?.total_price ? (
							<div>
								Requested Price:
								{' '}
								{`${activePair?.currency} ${activePair?.total_price}`}
								/ctr.
							</div>
						) : null}
					</div>
					<Price data={statsData?.projected_consolidated_revenue} />
					<Line />
					<Percentage data={statsData?.projected_consolidated_profitability.toFixed(2)} />
					<Line />
				</div>
				<div>
					{data?.status === 'pending_approval' && activePair?.status === 'quoted' ? (
						<div className={styles.buttons}>
							<Button
								themeType="secondary"
								size="md"
								onClick={() => {
									handleUpdateContract({
										payload: {
											id           : activePair?.id,
											service_type : activePair?.service_type,
											status       : 'rejected',
										},
									});
								}}
							>
								Reject
							</Button>
							<Button
								size="md"
								themeType="accent"
								onClick={() => {
									handleUpdateContract({
										payload: {
											id           : activePair?.id,
											service_type : activePair?.service_type,
											status       : 'approved',
										},
									});
								}}
							>
								Approve
							</Button>
						</div>
					) : (
						<Pill
							color={activePair?.status === 'rejected' ? 'red' : 'green'}
							style={{
								padding     : '4px',
								marginRight : '34px',
							}}
						>
							{activePair?.status === 'rejected' ? 'Rejected' : 'Approved'}
						</Pill>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
