import { Button, Input } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdateOrganizationContract from '../hooks/useUpdateOrganizationContract';
import styles from '../styles.module.css';

function ContractItem({ item, index, step, control, id }) {
	const [value, setValue] = useState();
	const ZERO = 0;
	const ONE = 1;
	const { UpdateOrganizationContract } = useUpdateOrganizationContract({ item, id, updatedValue: value });
	return (
		<div key={item}>
			<div className={styles.box_layout}>
				<div className={styles.term}>
					Term
					{' '}
					{index + ONE}
				</div>
				<div className={styles.term_content}>
					{item?.display_content}
				</div>
				<div className={styles.update}>
					{step === ONE ? (
						<>
							<div className={styles.icon}><IcMInfo height={26} width={26} /></div>
							<Input
								size="sm"
								value={value}
								onChange={setValue}
								style={{ marginLeft: '12px', height: '20px', width: '140px' }}
								placeholder=" "
								disabled={item?.state === 'approved'}
							/>
							<Button
								size="sm"
								themeType="secondary"
								className={styles.update_button}
								style={{ height: '28px' }}
								onClick={() => UpdateOrganizationContract('updated')}
							>
								Update

							</Button>
						</>
					) : (
						<>
							<span className={styles.icon}>Original Value</span>
							<InputController
								size="sm"
								control={control}
								name="original_value"
								rules={{ required: { value: true, message: 'Value is required' } }}
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
							<InputController
								size="sm"
								control={control}
								name="updated_value"
								rules={{ required: { value: true, message: 'Value is required' } }}
								style={{ marginLeft: '12px', height: '20px', width: '90px' }}
								placeholder=" "
								disabled
								value={item?.variables_details?.[ZERO]?.updated_value}
							/>

							<Button
								size="sm"
								themeType="secondary"
								className={styles.update_button}
								style={{ height: '28px' }}
								onClick={() => UpdateOrganizationContract('approved')}
							>
								Confirm

							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default ContractItem;
