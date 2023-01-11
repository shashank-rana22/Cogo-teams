import { Button } from '@cogoport/components';

import Line from '../../../../common/Line';
import Percentage from '../../../../common/MiniCard/Percentage';

import Charts from './Charts';
import Header from './Header';
import styles from './styles.module.css';

function Main({ activePair, handleUpdateContract }) {
	return (
		<div className={styles.container}>
			<Header activePair={activePair} />
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
					<Line />
					<div>
						<Percentage />
					</div>
				</div>
				<div>
					{activePair?.status === 'quoted' ? (
						<div className={styles.buttons}>
							<Button
								themeType=""
								size="md"
								onClick={() => {
									handleUpdateContract('rejected');
								}}
							>
								Reject
							</Button>
							<Button
								size="md"
								themeType="accent"
								onClick={() => {
									handleUpdateContract('active');
								}}
							>
								Approve
							</Button>
						</div>
					) : null}
				</div>
			</div>
			<Charts />
		</div>
	);
}

export default Main;
