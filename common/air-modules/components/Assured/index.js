import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

const COGO_ASSURED_IMAGE_URL = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-verifiedmark.svg';

function Assured({ shipmentData = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img
					src={COGO_ASSURED_IMAGE_URL}
					alt="verifiedmark"
					width="20"
					height="20"
				/>
				<div className={styles.text}>Assured By Cogoport</div>
			</div>

			<div className={styles.assured_details}>
				{(shipmentData?.cogo_assured_value_props || []).map((element) => (
					<div style={{ marginBottom: '14px' }} key={element}>
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
