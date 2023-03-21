/* eslint-disable no-unsafe-optional-chaining */
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetPayablesByService from '../hooks/useGetPayablesByService';

import styles from './styles.module.css';

function AccountPayablesByService() {
	const [isAccordionActive, setIsAccordionActive] = useState(false);
	const handleClick = () => {
		setIsAccordionActive(!isAccordionActive);
	};
	const { data = [] } = useGetPayablesByService();
	const oceanAmount = data?.[0]?.amount + data?.[1]?.amount;
	const airAmount = data?.[2]?.amount + data?.[3]?.amount;
	const surfaceAmount = data?.[4]?.amount + data?.[5]?.amount;

	return (
		<div>
			<div
				className={styles.container}
				style={{
					transition : 'max-height 0.3s ease-in-out',
					maxHeight  : isAccordionActive ? '430px' : '100px',
				}}
			>
				<div className={styles.heading}>
					Account Payables By Service
				</div>
				<div className={styles.hr} />
				<div className={styles.amount_container}>
					<div className={styles.amount}>
						<div className={styles.label}>
							Ocean
						</div>
						<div className={styles.value}>
							{getFormattedPrice(oceanAmount, 'INR')}
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.label}>
							Air
						</div>
						<div className={styles.value}>
							{getFormattedPrice(airAmount, 'INR')}
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.label}>
							Surface
						</div>
						<div className={styles.value}>
							{getFormattedPrice(surfaceAmount, 'INR')}
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.label}>
							Overseas
						</div>
						<div className={styles.value}>
							{getFormattedPrice(0, 'INR')}
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.label}>
							Overheads
						</div>
						<div className={styles.value}>
							{getFormattedPrice(0, 'INR')}
						</div>
					</div>
				</div>
				<div className={styles.imports_container}>
					<div className={styles.sub_container}>
						<div className={styles.ocean_text}>
							Ocean
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							FCL Imports
						</div>
						<div className={styles.ocean_value}>
							INR 20,495,2457.00
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							FCL Exports
						</div>
						<div className={styles.ocean_value}>
							INR 20,495,2457.00
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							LCL Imports
						</div>
						<div className={styles.ocean_value}>
							INR 20,495,2457.00
						</div>
					</div>
					<div className={styles.vr} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							LCL Exports
						</div>
						<div className={styles.ocean_value}>
							INR 20,495,2457.00
						</div>
					</div>
				</div>
			</div>

			<div className={styles.footer}>
				<div
					className={styles.footer_text}
					onClick={() => handleClick()}
					role="presentation"
				>
					{isAccordionActive ? 'Show less' : 'Show more'}
					<IcMArrowDown height={15} width={15} className={styles.down} />
				</div>
			</div>
		</div>
	);
}

export default AccountPayablesByService;
