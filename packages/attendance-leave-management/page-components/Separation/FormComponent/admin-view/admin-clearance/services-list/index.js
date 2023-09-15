// import { Button } from '@cogoport/components';
import { InputController, SelectController } from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const IDCARDOPTIONS = [{ label: 'Collected', value: 'collected' }, { label: 'Not Collected', value: 'notcollected' }];
const ACCESSCARDOPTIONS = [
	{ label: 'Collected', value: 'collected' },
	{ label: 'Not Collected', value: 'notcollected' }];
const COMPANYASSETS = [
	{ label: 'Collected', value: 'collected' },
	{ label: 'Not Collected', value: 'notcollected' },
	{ label: 'Not Allocated', value: 'notallocated' }];

function Servicelist({ control = {}, errors = {}, is_complete = false }) {
	const [show, setShow] = useState(true);
	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Services List</span>
				<IcMArrowDown
					width={16}
					height={16}
					className={show ? styles.caret_active : styles.caret_arrow}
				/>
			</div>

			<div className={show ? styles.item_container : styles.item_container_closed}>
				<div className={styles.detail}>
					<div className={styles.label}>ID Card Collection</div>
					<SelectController
						size="sm"
						control={control}
						name="idCardStatus"
						options={IDCARDOPTIONS}
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.idCardStatus ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Access Card Collection</div>
					<SelectController
						size="sm"
						control={control}
						name="accessCardStatus"
						options={ACCESSCARDOPTIONS}
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.accessCardStatus ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Company Assets</div>
					<SelectController
						size="sm"
						control={control}
						name="companyAssets"
						options={COMPANYASSETS}
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.companyAssets ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Parking Charges</div>
					<InputController
						size="sm"
						placeholder="Enter a number"
						control={control}
						name="parkingCharges"
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>

					{errors.parkingCharges ? <span className={styles.error}>*required</span> : null}
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Other Charges</div>
					<InputController
						size="sm"
						placeholder="Enter a number"
						control={control}
						name="otherCharges"
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.otherCharges ? <span className={styles.error}>*required</span> : null}
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
