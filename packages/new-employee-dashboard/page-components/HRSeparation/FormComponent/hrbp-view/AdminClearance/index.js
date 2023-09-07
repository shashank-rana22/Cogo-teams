import { Button } from '@cogoport/components';
import { IcCFtick, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import Heading from '../HRMeeting/Heading';

import styles from './styles.module.css';

function AdminClearance() {
	return (
		<>
			<Heading title="ADMIN CLEARANCE" subTitle="FNF & other settlements " />
			<div className={styles.container}>
				<div className={styles.heading}>
					Status
				</div>
				<div className={styles.content}>
					<div className={styles.column}>
						<div className={styles.row1}>ID Card</div>
						<div className={styles.row2}>
							<IcCFtick width={16} height={16} style={{ color: '#849E4C' }} />
							<span style={{ marginLeft: '4px' }}>Submitted</span>

						</div>

					</div>
					<div className={styles.column}>
						<div className={styles.row1}>Access Card</div>
						<div className={styles.row2}>
							<IcCFtick width={16} height={16} style={{ color: '#849E4C' }} />
							<span style={{ marginLeft: '4px' }}>Submitted</span>

						</div>

					</div>
					<div className={styles.column}>
						<div className={styles.row1}>Parking Ticket</div>
						<div className={styles.row2}>
							<IcCFtick width={16} height={16} style={{ color: '#849E4C' }} />
							<span style={{ marginLeft: '4px' }}>Submitted</span>

						</div>

					</div>
					<div className={styles.column}>
						<div className={styles.row1}>Parking Charges</div>
						<div className={styles.row2}>
							<span style={{ color: '#BF291E' }}>100rs</span>

						</div>

					</div>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.heading}>
					Notes shared with you
				</div>
				{/* <InputController
					control={control}
					name="notes_shared"
					size="md"
					style={{ marginRight: '8px' }}
					placeholder="Typed"
				/> */}
			</div>

			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '4px' }}>Back</Button>
				<Button themeType="primary">
					Proceed
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

				</Button>
			</div>

		</>
	);
}

export default AdminClearance;
