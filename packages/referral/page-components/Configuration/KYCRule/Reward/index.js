import { SelectController } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncListPromotions } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Reward({ isEdit, control, errors }) {
	const promotions = useGetAsyncOptions(merge(asyncListPromotions()));

	return (
		<div className={styles.flex}>
			<div className={styles.content}>
				<div className={styles.referree_reward}>
					<div className={styles.sub_heading}>Referree Reward</div>
					<div className={styles.input_controller}>
						<SelectController
							control={control}
							name="promotion_id"
							className={styles.select_box}
							size="sm"
							disabled={isEdit}
							rules={{ required: true }}
							{...promotions}
						/>
						{errors.promotion_id && (
							<span className={styles.error}>Required</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Reward;
