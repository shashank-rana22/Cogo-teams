/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
// import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import getPocRole from '../../utils/getPocRole';

import styles from './styles.module.css';

const labelMapping = {
	name           : 'Name',
	email          : 'Email ID',
	mobile_number  : 'Mobile Number',
	poc_role       : 'Role in the Company',
	document_proof : 'Document Proof',
};

function CompanyPOC({
	data,
}) {
	const details = (data?.pocs || []).map((poc) => {
		const obj = {
			name          : poc?.name,
			email         : poc?.email,
			mobile_number : `${poc?.mobile_country_code} ${poc?.mobile_number}`,
			poc_role      : poc?.poc_role,
			document_proof:
	<div className={styles.download}>
		<a
			href={poc.contact_proof_url}
			target="_blank"
			className={styles.link}
			style={{
				color: '#F68B21',
			}}
			rel="noreferrer"
		>
			{poc.contact_proof_url}
		</a>
		<div>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/download-icon.svg"
				alt="icon"
			/>
		</div>
	</div>,
		};
		return obj;
	})[0];

	return (
		<div className={styles.main}>
			<span className={styles.heading}>
				Company POC
			</span>

			<div className={styles.content}>
				<div className={styles.box_info}>
					{Object.keys(details).map((poc) => (
						<div className={styles.label_value_container}>
							<div className={styles.top}>
								{labelMapping[poc]}
							</div>

							<div className={styles.bottom}>
								{poc === 'poc_role' ? getPocRole(details[poc]) : details[poc]}
							</div>
						</div>
					))}
				</div>
			</div>

			<hr className={styles.dis} />

		</div>
	);
}

export default CompanyPOC;
