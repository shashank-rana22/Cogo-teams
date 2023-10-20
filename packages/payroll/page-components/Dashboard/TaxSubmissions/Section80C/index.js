import { Button, Modal } from '@cogoport/components';
import { InputController, useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function SectionEightyC({ setToAdd = () => {} }) {
	const [show, setShow] = useState(false);
	const { control } = useForm();
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.header} aria-hidden onClick={() => setToAdd(false)}>
					<div style={{ display: 'flex' }}>
						<div
							className={styles.arrow_back}
							aria-hidden
						>
							<IcMArrowBack width={20} height={20} />

						</div>
						<div className={styles.heading}>
							<div className={styles.upper_heading}>SECTION 80C</div>
							<div className={styles.lower_heading}>
								Declare your investment & other amounts
							</div>
						</div>
					</div>
				</div>

				<div className={styles.card_container}>
					<div className={styles.card}>
						<div className={styles.left_card}>
							<div className={styles.heading}>
								<div className={styles.upper_heading}>Investments under Section 80C</div>
								<div className={styles.lower_heading}>
									(Max ₹1,50,000) Investments in ELSS funds, PPF, FD, ULIP etc.
									Do not include EPF/VPF contributions since XPayroll will automatically add those.
								</div>
								<div>
									<Button
										size="md"
										themeType="secondary"
										onClick={() => setShow(true)}
									>
										Upload Proof
									</Button>

								</div>
							</div>
						</div>
						<div className={styles.right_card}>
							<div className={styles.right_subcard}>
								<div>Declared Amount</div>
								<InputController control={control} name="declared_amount" type="number" />
							</div>
							<div className={styles.right_subcard}>
								<div>Approved Amount</div>
								<InputController control={control} name="approved_amount" type="number" />
							</div>
						</div>
					</div>
				</div>

				<Modal size="lg" show={show} onClose={() => setShow(false)} placement="center">
					<Modal.Header title="Upload Proof" />
					<Modal.Body>
						xcx
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.submit}>
							<Button
								themeType="secondary"
								onClick={() => { setShow(false); }}
							>
								Cancel
							</Button>
							<Button themeType="accent" className={styles.smt_btn}>Yes, Proceed</Button>
						</div>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}

export default SectionEightyC;
