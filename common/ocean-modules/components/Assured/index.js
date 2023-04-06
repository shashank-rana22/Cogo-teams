import { cl } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Assured({ shipmentData = {} }) {
	return (
		<div className={cl`${styles.container} cogo-assured`}>
			<div className={styles.text}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-verifiedmark.svg"
					alt="verifiedmark"
					width="20"
					height="20"
				/>
				<div className={styles.text}>Assured By Cogoport</div>
			</div>

			<div className={styles.assured_details}>
				{shipmentData?.cogo_assured_value_props?.map((element) => (
					<div style={{ marginBottom: '14px' }}>
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
