import { Button } from '@cogoport/components';

import Line from '../../../../common/Line';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';
import formatPortPair from '../../../../utils/formatPortPair';

import styles from './styles.module.css';

function Content({
	handleUpdateContract,
	statsData,
	data,
	loadingUpdate,
}) {
	const formattedData = formatPortPair({ item: data });

	let counter = 0;
	formattedData.forEach((item) => {
		if (item?.status === 'quoted') {
			counter += 1;
		}
	});

	return (
		<div className={styles.main_container}>
			<div className={styles.information}>
				{/* {statsData?.projected_consolidated_profitability
					? ( */}
				{/* <> */}
				<Percentage data={statsData?.projected_consolidated_profitability.toFixed(2)} />
				<Line />
				{/* </> */}
				{/* ) : null} */}
				<Price data={statsData?.projected_consolidated_revenue} />
				<Line />
				{/* <Margin /> */}
			</div>
			{data?.status === 'pending_approval' ? (
				<div className={styles.button_container}>
					<Button
						themeType="accent"
						size="md"
						onClick={() => {
							handleUpdateContract('active');
						}}
						disabled={counter !== 0 || loadingUpdate}
					>
						FINISH JOB
					</Button>
					{counter !== 0 ? (
						<div className={styles.pending}>
							Pending:
							{' '}
							{`${counter}/${formattedData.length}`}
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
}
export default Content;
