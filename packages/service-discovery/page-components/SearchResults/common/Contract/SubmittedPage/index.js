import { Button, Pill } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import LoadOverview from '../../../../../common/Header/LoadOverview';

import styles from './styles.module.css';

function Submitted({ detail = {}, contractData = {} }) {
	const { max_containers_count = 100 } = contractData;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcCFtick width={40} height={40} />

				<div className={styles.text_container}>
					<span className={styles.heading}>Sit tight and wait!</span>
					<span className={styles.heading}>Your request for contract has been successfully submitted.</span>
					<span className={styles.sub_heading}>Our team will get back to you within the next 24 hours.</span>
				</div>

				<Button size="lg" themeType="accent" className={styles.button}>
					View Request
				</Button>
			</div>

			<div className={styles.preview_container}>
				<span className={styles.preview_label}>Following is a preview of your request</span>

				<div className={styles.preview}>
					<div className={styles.left_section}>
						<span className={styles.request_id}>Request ID: 321249</span>

						{/* <div className={styles.location}>
							<LocationDetails data={detail} showSmall />
						</div> */}
					</div>

					<div className={styles.right_section}>
						<div className={styles.containers_count}>
							Count:
							<strong>{`${max_containers_count} Containers`}</strong>
						</div>

						<LoadOverview
							data={detail}
							isAllowedToEdit={false}
							showSmall
						/>

						<Pill size="sm" color="#FBD1A6">Pending Approval</Pill>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Submitted;
