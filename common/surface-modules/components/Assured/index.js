import { IcCFtick } from '@cogoport/icons-react';
import { useMemo } from 'react';

import styles from './styles.module.css';

function Assured({ shipmentData = {} }) {
	const keys = useMemo(
		() => Array(shipmentData?.cogo_assured_value_props.length).fill(null).map(() => Math.random()),
		[shipmentData?.cogo_assured_value_props?.length],
	);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-verifiedmark.svg"
					alt="verifiedmark"
					width="20"
					height="20"
				/>
				<div className={styles.text}>Assured By Cogoport</div>
			</div>

			<div className={styles.assured_details}>
				{shipmentData?.cogo_assured_value_props?.map((element, index) => (
					<div style={{ marginBottom: '14px' }} key={keys[index]}>
						<div className={styles.heading}>
							<div className={styles.icon_wrapper}>
								<IcCFtick />
							</div>

							<div className={styles.item_label}>{element}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Assured;
