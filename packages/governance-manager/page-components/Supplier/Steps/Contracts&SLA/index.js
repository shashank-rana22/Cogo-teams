/* eslint-disable no-magic-numbers */
import { Button } from '@cogoport/components';
import { InputController, useForm } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function ContractSla() {
	const [step, setStep] = useState(1);
	const {
		control,
	} = useForm();

	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				Contract & SLA -
				<div className={styles.headingsteps}>
					Step
					{' '}
					{step}
					/2
				</div>
			</div>
			{[1, 2, 3].map((x) => (
				<div key={x}>
					<div className={styles.box_layout}>
						<div className={styles.term}>Term 1</div>
						<div className={styles.term_content}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
							when an unknown printer
							took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic typesetting,
							remaining essentially unchanged.
							It was popularized in the 1960s with the release of Leeriest sheets
							containing Lorem Ipsum passages, and more recently with desktop publishing software like
							Lauds PageMaker including
							versions of Lorem Ipsum
						</div>
						<div className={styles.update}>
							{step === 1 ? (
								<>
									<div className={styles.icon}><IcMInfo height={26} width={26} /></div>
									<InputController
										size="sm"
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
			))}
			{step === 1 ? (
				<div className={styles.footer}>
					{' '}
					<Button style={{ fontWeight: 600 }} onClick={() => { setStep(2); }}>Save & Next</Button>
					{' '}
					<Button
						themeType="secondary"
						style={{ fontWeight: 600 }}
						onClick={() => { setStep(1); }}
					>
						Save & Do It Later

					</Button>
				</div>
			) : (
				<div className={styles.step_two_footer}>
					{' '}
					<Button
						themeType="secondary"
						style={{ fontWeight: 600 }}
						onClick={() => { setStep(1); }}
					>
						Save & Do It Later

					</Button>
					<div className={styles.side_line_buttons}>
						<Button style={{ fontWeight: 600 }} onClick={() => { setStep(2); }}>Approve</Button>
						{' '}
						<Button
							themeType="secondary"
							style={{ fontWeight: 600 }}
							onClick={() => { setStep(1); }}
						>
							Reject

						</Button>

					</div>
				</div>
			)}
		</div>
	);
}
export default ContractSla;
