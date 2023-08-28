import { Button, Input, Checkbox } from '@cogoport/components';
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
	const ZERO = 0;
	const ONE = 1;
	const [value, setValue] = useState(item?.variables_details?.[ZERO]?.updated_value);
	const { updateOrganizationContract } = useUpdateOrganizationContract({
		item,
		id,
		updatedValue: value,
		getOrganizationContract,
	});

	return (
		<div key={item}>
			<div className={styles.box_layout}>
				<div className={styles.term}>
					{
                    item?.state !== 'approved'
					&& (
						<Checkbox
							style={{ paddingLeft: '0px' }}
							onChange={(e) => {
								if (e.target.checked) {
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
				{item?.variables_details?.[ZERO] && (
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
							placeholder=" "
							disabled
							value={item?.variables_details?.[ZERO]?.default_value}
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
							placeholder=" "
							disabled
							value={item?.variables_details?.[ZERO]?.updated_value}
						/>

						<Button
							size="sm"
							themeType="secondary"
							className={styles.update_button}
							style={{ height: '28px' }}
							disabled={item?.state === 'approved'}
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
