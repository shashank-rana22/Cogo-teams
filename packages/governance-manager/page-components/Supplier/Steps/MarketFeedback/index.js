import { Button } from '@cogoport/components';
import { useState } from 'react';

import RoleInput from './RoleInput';
import styles from './styles.module.css';

function MarketFeedback() {
	const [totalInput, setTotalInput] = useState(2);
	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				<div>
					Role
				</div>
				<div>
					Email Id
				</div>
			</div>
			{
				[...Array(totalInput)]?.map((item, index) => (
					<RoleInput key={index} />
				))
			}
			<div
				className={styles.add_more}
				onClick={() => setTotalInput(totalInput + 1)}
			>
				+Add More
			</div>
			<div className={styles.flex_right}>
				<Button themeType="secondary">Save & Do it Later</Button>
				<Button>Submit & Next</Button>

			</div>
		</div>
	);
}
export default MarketFeedback;
