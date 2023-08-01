import { Button, Input } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdateOrganizationContract from '../hooks/useUpdateOrganizationContract';
import styles from '../styles.module.css';

function ContractItem({ item, index, step, control }) {
	const [value, setValue] = useState();
	const ONE = 1;
	const { UpdateOrganizationContract } = useUpdateOrganizationContract();

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
								control={control}
								name="update"
								rules={{ required: { value: true, message: 'POC Name is required' } }}
								style={{ marginLeft: '12px', height: '20px', width: '140px' }}
								placeholder=" "
							/>
							<Button
								size="sm"
								themeType="secondary"
								className={styles.update_button}
								style={{ height: '28px' }}
								onClick={UpdateOrganizationContract}
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
							/>
							<span className={styles.icon}>Updated Value</span>
							<InputController
								size="sm"
								control={control}
								name="updated_value"
								rules={{ required: { value: true, message: 'Value is required' } }}
								style={{ marginLeft: '12px', height: '20px', width: '90px' }}
								placeholder=" "
							/>
							<Button
								size="sm"
								themeType="secondary"
								className={styles.update_button}
								style={{ height: '28px' }}
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
