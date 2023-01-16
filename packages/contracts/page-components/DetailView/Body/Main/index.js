import { Button, Pill } from '@cogoport/components';

import Line from '../../../../common/Line';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';

import Charts from './Charts';
import Header from './Header';
import styles from './styles.module.css';

function Main({ activePair, handleUpdateContract, data, statsData }) {
	const stats = (statsData?.port_pairs_data || []).find((item) => item?.id === activePair?.id);

	return (
		<div className={styles.container}>
			<Header activePair={activePair} stats={stats} />
			<div className={styles.actions}>
				<div className={styles.stats}>
					<div>
						{activePair?.total_price ? (
							<div>
								Request Price:
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
			<Charts
				activePair={activePair}
				data={data}
				handleUpdateContract={handleUpdateContract}
				statsData={statsData}
				stats={stats}
			/>
		</div>
	);
}

export default Main;
