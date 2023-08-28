import { Placeholder } from '@cogoport/components';
import { IcMArrowRight, IcMAppProfile } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Locations({ data, setSelectedLocation, loading }) {
	if (loading) {
		return <Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.above_text}>BRANCHES</div>
			<div className={styles.branches_container}>
				{(data || []).map((item) => (
					<div
						key={item.id}
						aria-hidden
						className={styles.card}
						onClick={() => setSelectedLocation(item.id)}
					>
						<div className={styles.card_container}>
							<div className={styles.card_content}>
								<div className={styles.left_card}>
									<div className={styles.location}>
										<span>{item.display_name}</span>
									</div>
								</div>
							</div>
							<div className={styles.arrow_section}>
								<div className={styles.below_text}>
									<IcMAppProfile />
									<span>{item.employee_count}</span>
								</div>
								<div><IcMArrowRight width={20} height={20} /></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Locations;
