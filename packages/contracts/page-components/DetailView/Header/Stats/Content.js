import { Button } from '@cogoport/components';

import Line from '../../../../common/Line';
import Margin from '../../../../common/MiniCard/Margin';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';

import styles from './styles.module.css';

function Content({  handleUpdateContract, statsData }) {


	return (
		<div className={styles.main_container}>
			<div className={styles.information}>
				{/* {statsData?.projected_consolidated_profitability
					? ( */}
						{/* <> */}
						<>
							<Percentage data={statsData?.projected_consolidated_profitability} />
							<Line />
							</>
						{/* </> */}
					{/* ) : null} */}
					<>
				<Price data={statsData?.projected_consolidated_revenue} />
				<Line />
					</>
				{/* <Margin /> */}
			</div>
			<div className={styles.button_container}>
				<Button
					themeType="accent"
					size="md"
					onClick={() => {
						handleUpdateContract('active');
					}}
				>
					FINISH JOB
				</Button>
				<div className={styles.pending}>
					Pending : 3/3
				</div>
			</div>
		</div>
	);
}
export default Content;
