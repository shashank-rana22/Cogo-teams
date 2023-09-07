import { Select, Input, Button } from '@cogoport/components';
import { IcMArrowDown, IcMPlus } from '@cogoport/icons-react';
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

function Servicelist({ source = 'admin-clearance' }) {
	const [show, setShow] = useState(false);
	const [idCardStatus, setIdCardStatus] = useState(null);
	const [accesscard, setaccesscard] = useState(null);
	const [companyAssetsStatus, setcompanyAssetsStatus] = useState(null);
	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Services List</span>
				{
					source === 'admin-clearance' ? (
						<div className={styles.accordiontitle}>
							<Button
								size="md"
								themeType="secondary"
								className={styles.servicesbtn}
							>
								<IcMPlus />
								Add Services
							</Button>
							<IcMArrowDown
								width={16}
								height={16}
								className={show ? styles.caret_active : styles.caret_arrow}
							/>
						</div>
					)
						:					(
							<IcMArrowDown
								width={16}
								height={16}
								className={show ? styles.caret_active : styles.caret_arrow}
							/>
						)
				}

			</div>

			<div className={show ? styles.item_container : styles.item_container_closed}>
				<div className={styles.detail}>
					<div className={styles.label}>ID Card Collection</div>
					<Select
						size="md"
						value={idCardStatus}
						onChange={(value) => setIdCardStatus(value)}
						placeholder="Select Status"
						options={id_card_options}
					/>
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Access Card Collection</div>
					<Select
						size="md"
						value={accesscard}
						onChange={(value) => setaccesscard(value)}
						placeholder="Select Status"
						options={access_card_options}
					/>
				</div>

				<div className={styles.detail}>
					<div className={styles.label}>Parking Charges</div>
					<Input size="md" placeholder="Select Status" />
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Other Charges</div>
					<Input size="md" placeholder="Select Status" />
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Specify Other Charges</div>
					<Input size="md" placeholder="Select Status" />
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Company Assets</div>
					<Select
						size="md"
						value={companyAssetsStatus}
						onChange={(value) => setcompanyAssetsStatus(value)}
						placeholder="Select Status"
						options={company_assets}
					/>
				</div>
			</div>

		</div>
	);
}

export default Servicelist;
