import { Modal, Checkbox, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import styles from './styles.module.css';

function TnC() {
	const { profile = {} } = useSelector((state) => state);
	const tnc = { accepted: false };
	const [disabled, setDisabled] = useState(true);
	return (
		<div>

			{(Object.keys(profile).includes('partner') && tnc?.accepted === false) ? (
				<div className={styles.container}>

					<Modal size="lg" show placement="center" showCloseIcon={false}>
						<Modal.Header title="Terms and Conditions" />
						<Modal.Body scroll={false}>
							<div className={styles.modal_container}>
								et consectetur adipisicing elit.
								Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
								consequuntur, voluptates tenetur rem obcaecati
								sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis,
								assumenda. Hic ipsam doloremque assumenda
								et soluta expedita consequuntur, voluptates tenetur rem
								obcaecati sapiente aliquam animi voluptas.
								Pariatur eaque aut sunt?
								et consectetur adipisicing elit.

								Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
								consequuntur, voluptates tenetur rem obcaecati
								sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis,
								assumenda. Hic ipsam doloremque assumenda
								et soluta expedita consequuntur, voluptates tenetur rem
								obcaecati sapiente aliquam animi voluptas.
								Pariatur eaque aut sunt?

								Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
								consequuntur, voluptates tenetur rem obcaecati
								sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis,
								assumenda. Hic ipsam doloremque assumenda
								et soluta expedita consequuntur, voluptates tenetur rem
								obcaecati sapiente aliquam animi voluptas.
								Pariatur eaque aut sunt?

								Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
								consequuntur, voluptates tenetur rem obcaecati
								sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis,
								assumenda. Hic ipsam doloremque assumenda
								et soluta expedita consequuntur, voluptates tenetur rem
								obcaecati sapiente aliquam animi voluptas.
								Pariatur eaque aut sunt?
							</div>
							<div className={styles.flex}>
								<div style={{ marginLeft: '5px' }}>
									<Checkbox
										label="Read and Agreed with our all Terms of Use"
										onChange={() => setDisabled(!disabled)}
									/>

								</div>
								<div className={styles.button}>
									<Button
										disabled={disabled}
										size="md"
										themeType="primary"
										onClick={() => { window.location.reload(true); }}
									>
										Agree

									</Button>

								</div>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			) : null}
		</div>
	);
}
export default TnC;
