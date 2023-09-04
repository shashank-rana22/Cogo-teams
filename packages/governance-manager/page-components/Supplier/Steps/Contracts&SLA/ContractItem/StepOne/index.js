import { Button, Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import useUpdateOrganizationContract from '../../hooks/useUpdateOrganizationContract';
import styles from '../../styles.module.css';

function StepOne({ t, item, index, id, getOrganizationContract }) {
	const ZERO = GLOBAL_CONSTANTS.zeroth_index;
	const ONE = GLOBAL_CONSTANTS.one;
	const [value, setValue] = useState(item?.variables_details?.[ZERO]?.updated_value);
	const { updateOrganizationContract } = useUpdateOrganizationContract({
		item,
		id,
		updatedValue: value,
		getOrganizationContract,
	});

	return (
		<div key={item?.config_id}>
			<div className={styles.box_layout}>
				<div className={styles.term}>
					<div>
						{t('supplier_page_contract_sla_step1_term_label')}
						{' '}
						{index + ONE}
					</div>
				</div>
				<div className={styles.term_content}>
					{item?.display_content}
				</div>
				<div className={styles.update}>
					{item?.variable_details?.[ZERO] && (
						<>
							<Input
								size="sm"
								value={value}
								onChange={setValue}
								style={{ marginLeft: '12px', height: '20px', width: '140px' }}
								placeholder="Enter Value"
								disabled={item?.state === 'approved'}
							/>
							<Button
								size="sm"
								themeType="secondary"
								className={styles.update_button}
								style={{ height: '28px' }}
								disabled={item?.state === 'approved'}
								onClick={() => updateOrganizationContract('updated')}
							>
								{t('supplier_page_contract_sla_step1_update_button_label')}
							</Button>
						</>
					)}

				</div>
			</div>
		</div>
	);
}

export default StepOne;
