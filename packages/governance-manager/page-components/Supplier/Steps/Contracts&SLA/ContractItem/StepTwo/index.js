import { Button, Input, Checkbox } from '@cogoport/components';
import { useState } from 'react';

import useUpdateOrganizationContract from '../../hooks/useUpdateOrganizationContract';
import styles from '../../styles.module.css';

function StepTwo({
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
										[...negotiationIds, item?.organization_contract_configuration_id],
									);
								} else {
									setNegotiationIds(
										(prev) => prev.filter(
											(i) => i !== item?.organization_contract_configuration_id,
										),
									);
								}
							}}
						/>
					)

                    }
					<div>
						Term
						{' '}
						{index + ONE}
					</div>
				</div>
				<div className={styles.term_content}>
					{item?.display_content}
				</div>
				<div className={styles.update}>
					<span className={styles.icon}>Original Value</span>
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
					<span className={styles.icon}>Updated Value</span>
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
						Confirm

					</Button>
				</div>
			</div>
		</div>
	);
}

export default StepTwo;
