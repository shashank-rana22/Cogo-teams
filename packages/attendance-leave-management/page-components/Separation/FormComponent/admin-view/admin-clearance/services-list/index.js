// import { Button } from '@cogoport/components';
import { InputController, SelectController } from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const id_card_options = [{ label: 'Collected', value: 'collected' }, { label: 'Not Collected', value: 'notcollected' }];
const access_card_options = [
	{ label: 'Collected', value: 'collected' },
	{ label: 'Not Collected', value: 'notcollected' }];
const company_assets = [
	{ label: 'Collected', value: 'collected' },
	{ label: 'Not Collected', value: 'notcollected' },
	{ label: 'Not Allocated', value: 'notallocated' }];

function Servicelist({ source = 'admin-clearance', control = {}, errors = {}, is_complete = false }) {
	const [show, setShow] = useState(true);
	// const [idCardStatus, setIdCardStatus] = useState(null);
	// const [accesscard, setaccesscard] = useState(null);
	// const [companyAssetsStatus, setcompanyAssetsStatus] = useState(null);
	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Services List</span>
				{source === 'admin-clearance' ? (
					<div className={styles.accordiontitle}>
						{/* <Button
								size="md"
								themeType="secondary"
								className={styles.servicesbtn}
							>
								<IcMPlus />
								Add Services
							</Button> */}
						<IcMArrowDown
							width={16}
							height={16}
							className={show ? styles.caret_active : styles.caret_arrow}
						/>
					</div>
				) :	(
					<IcMArrowDown
						width={16}
						height={16}
						className={show ? styles.caret_active : styles.caret_arrow}
					/>
				)}
			</div>

			<div className={show ? styles.item_container : styles.item_container_closed}>
				<div className={styles.detail}>
					<div className={styles.label}>ID Card Collection</div>
					<SelectController
						size="sm"
						control={control}
						name="idcardstatus"
						options={id_card_options}
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.idcardstatus ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Access Card Collection</div>
					<SelectController
						size="sm"
						control={control}
						name="accesscardstatus"
						options={access_card_options}
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.accesscardstatus ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Company Assets</div>
					<SelectController
						size="sm"
						control={control}
						name="companyassets"
						options={company_assets}
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.companyassets ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Parking Charges</div>
					<InputController
						size="sm"
						placeholder="Enter a number"
						control={control}
						name="parkingcharges"
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>

					{errors.parkingcharges ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Other Charges</div>
					<InputController
						size="sm"
						placeholder="Enter a number"
						control={control}
						name="othercharges"
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.othercharges ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Specify Other Charges</div>
					<InputController
						size="sm"
						placeholder="Specify"
						control={control}
						name="specify"
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.specify ? <span className={styles.error}>*required</span> : null}
				</div>
			</div>
		</div>
	);
}

export default Servicelist;
