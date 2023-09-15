import { Button, Input, Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import useUpdateOrganizationContract from '../../hooks/useUpdateOrganizationContract';
import styles from '../../styles.module.css';

function StepTwo({
	t,
	item,
	index,
	id,
	negotiationIds,
	setNegotiationIds,
	getOrganizationContract,
}) {
	const ZERO = GLOBAL_CONSTANTS.zeroth_index;
	const ONE = GLOBAL_CONSTANTS.one;
	const [value, setValue] = useState(item?.variables_details?.[ZERO]?.updated_value);
	const { updateOrganizationContract } = useUpdateOrganizationContract({
		item,
		id,
		updatedValue: value,
		getOrganizationContract,
	});

	const toggleCheckbox = (val) => {
		if (val) {
			setNegotiationIds(
				[...negotiationIds, item?.config_id],
			);
		} else {
			setNegotiationIds(
				(prev) => prev.filter(
					(i) => i !== item?.config_id,
				),
			);
		}
	};

	return (
		<div key={item?.config_id}>
			<div className={styles.box_layout}>
				<div className={styles.term}>
					{
                    item?.state !== 'approved' && item?.variable_details?.[ZERO]?.updated_value
					&& (
						<Checkbox
							style={{ paddingLeft: '0px' }}
							onChange={(e) => {
								toggleCheckbox(e.target.checked);
							}}
						/>
					)

                    }
					<div>
						{t('supplier_page_contract_sla_step2_term_label')}
						{' '}
						{index + ONE}
					</div>
				</div>
				<div className={styles.term_content}>
					{item?.display_content}
				</div>
				{item?.variable_details?.[ZERO] && (
					<div className={styles.update}>

						<span className={styles.icon}>
							{t('supplier_page_contract_sla_step2_original_label')}
						</span>
						<Input
							size="sm"
							onChange={setValue}
							style={{
								marginLeft  : '12px',
								height      : '20px',
								width       : '90px',
								marginRight : '24px',
							}}
							disabled
							value={item?.variable_details?.[ZERO]?.default_value}
						/>
						<span className={styles.icon}>
							{t('supplier_page_contract_sla_step2_updated_label')}
						</span>
						<Input
							size="sm"
							onChange={setValue}
							style={{
								marginLeft  : '12px',
								height      : '20px',
								width       : '90px',
								marginRight : '24px',
							}}
							disabled
							value={item?.variable_details?.[ZERO]?.updated_value}
						/>
						<Button
							size="sm"
							themeType="secondary"
							className={styles.update_button}
							style={{ height: '28px' }}
							disabled={!item?.state || item?.state === 'approved'}
							onClick={() => updateOrganizationContract('approved')}
						>
							{t('supplier_page_contract_sla_step2_confirm_button_label')}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default StepTwo;
