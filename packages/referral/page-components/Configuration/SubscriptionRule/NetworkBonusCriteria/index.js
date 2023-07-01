import { SelectController } from '@cogoport/forms';
import React from 'react';

import { NETWORK_BONUS_CRITERIA } from '../../../../constants/configuration-constant';

import styles from './styles.module.css';

function NetworkBonusCriteria({ isEdit, control, errors }) {
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.content}>
					<div className={styles.bonus_criteria}>
						<div className={styles.input_controller}>
							<SelectController
								control={control}
								name="threshold_transacting_user"
								className={styles.select_box}
								size="sm"
								disabled={isEdit}
								rules={{ required: true }}
								options={NETWORK_BONUS_CRITERIA}
							/>
							{errors?.threshold_transacting_user && (
								<span className={styles.error}>Required</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NetworkBonusCriteria;
