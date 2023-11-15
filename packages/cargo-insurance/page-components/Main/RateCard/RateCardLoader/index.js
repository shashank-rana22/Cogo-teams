import { Placeholder } from '@cogoport/components';
import { IcMBreakBulkCargoType } from '@cogoport/icons-react';

import styles from '../styles.module.css';

const LINE_ITEM_LOADER = [...Array(3).keys()];

function RateCardLoader() {
	return (
		<div className={styles.card}>
			<div className={styles.img_container}>
				<Placeholder height="80%" margin="0px 0px 20px 0px">
					<IcMBreakBulkCargoType width={30} height={30} />
				</Placeholder>
			</div>

			<div className={styles.info_container}>

				<div className={styles.header}>
					<Placeholder height="50px" margin="0px 0px 20px 0px" />
				</div>

				<div className={styles.line_items}>
					<div>
						{LINE_ITEM_LOADER.map((ele) => (
							<Placeholder key={ele} height="20px" margin="0px 0px 20px 0px" />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RateCardLoader;
