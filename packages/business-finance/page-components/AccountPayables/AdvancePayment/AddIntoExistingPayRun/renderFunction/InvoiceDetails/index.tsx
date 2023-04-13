import { IcMArrowRotateUp, IcMArrowRotateDown, IcMArrowRotateLeft, IcMOverview } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ApprovedBy from './ApprovedBy';
import RequestedBy from './RequestedBy';
import styles from './styles.module.css';

const INVOICE_DATA_MAPPING = [
	{ id: '1', label: 'Requested by & on' },
	{ id: '2', label: 'Approved by & on' },
];

function InvoiceDetails() {
	const [showDetailsCard, setShowDetailsCard] = useState(false);
	const [dropDownData, setDropDownData] = useState(false);
	const handleShow = () => {
		setShowDetailsCard(true);
		// document.body.style.overflow = 'hidden';
	};
	const handleDropdown = (key = '') => {
		setDropDownData((previousActions) => ({
			...previousActions?.[key],
			[key]: !previousActions[key],
		}));
	};

	return (
		<div>
			<div style={{ color: '#F68B21', cursor: 'pointer' }} onClick={handleShow} role="presentation">
				<IcMOverview width={30} height={30} />
			</div>
			{showDetailsCard && (
				<div>
					<div className={styles.invoice_details_container} />
					<div className={styles.invoice_container} style={{ width: '35vw' }}>
						<div className={styles.container}>
							<div className={styles.content_caret}>
								<div
									className={styles.icon_container}
									onClick={() => {
										setShowDetailsCard(false);
										document.body.style.overflow = 'auto';
									}}
									role="presentation"
								>
									<IcMArrowRotateLeft />
								</div>
								<div className={styles.header_details}>
									More Details
								</div>

							</div>
							<div className={styles.body_details}>

								{INVOICE_DATA_MAPPING.map((item) => {
									const { id, label } = item;
									return (
										<div className={styles.information} key={id}>
											<div
												className={styles.data_container}
												onClick={() => { handleDropdown(id); }}
												role="presentation"
											>
												{label}
												<div>
													{dropDownData[id] ? (
														<IcMArrowRotateUp width={15} height={15} />
													) : (
														<IcMArrowRotateDown width={15} height={15} />
													)}
												</div>
											</div>
											{dropDownData[id] && <div className={styles.hr} />}
											{dropDownData[id] && (
												<div>
													<div className={styles.information_data}>
														{label === 'Requested by & on' && (
															<RequestedBy />
														)}
														{label === 'Approved by & on' && (
															<ApprovedBy />
														)}
													</div>
												</div>
											)}

										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default InvoiceDetails;
