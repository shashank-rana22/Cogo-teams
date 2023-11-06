import { Table, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import RaiseTicketModal from '../../../../../../../commons/RaiseTicketModal';
import getServiceColumns from '../../../../../../../configurations/getServiceColumns';

import Services from './Services';
import styles from './styles.module.css';

export default function Content({
	services = {},
	currentKey = '',
	shipment_id = '',
	getPrePostShipmentQuotes = () => {},
}) {
	const defaultSelectedService = Object.keys(services)?.[GLOBAL_CONSTANTS.zeroth_index] || '';

	const { query: { job_number = '' } } = useRouter();

	const [showTicketModal, setShowTicketModal] = useState(false);
	const [activeService, setActiveService] = useState(defaultSelectedService);
	const handleServiceClick = (service) => {
		setActiveService(service);
	};

	const auditStatus = window.sessionStorage.getItem('audit_status');

	return (
		<>
			<div className={styles.service_heading}>
				<div style={{ marginBottom: '6px' }}>
					Services
				</div>
				<div className={styles.service_component}>
					<Services
						services={services}
						handleServiceClick={handleServiceClick}
						activeService={activeService}
						defaultSelectedService={defaultSelectedService}
					/>
				</div>
			</div>

			{
			Array.isArray(services?.[activeService])
			&& ((activeService?.includes('service') || activeService?.includes('platform_fee')))
				? services?.[activeService]?.map((item) => (
					<div key={item?.id} className={styles.quotation}>
						<div className={styles.table}>
							<Table
								columns={getServiceColumns({ currentKey, item })}
								data={item?.lineItems?.lineItems || []}
							/>
						</div>

						{item?.modifiedBy
							? (
								<div style={{ display: 'flex' }}>
									<div className={styles.modification}>
										<div className={styles.modify_heading}>
											Modified By
										</div>
										<div className={styles.modify_content}>
											{item?.modifiedBy}
										</div>
									</div>
									<div className={styles.modification}>
										<div className={styles.modify_heading}>
											Modified At
										</div>
										<div className={styles.modify_content}>
											{formatDate({
												date       : item?.modifiedAt,
												dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
												formatType : 'date',
											})}
										</div>
									</div>
								</div>
							)
							: null}

						{(item?.quotationState !== 'APPROVED' && auditStatus !== 'audited') ? (
							<div className={styles.flex_content}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '10px' }}
									onClick={setShowTicketModal}
								>
									Raise Ticket
								</Button>

								{ showTicketModal ? (
									<RaiseTicketModal
										setShowTicketModal={setShowTicketModal}
										showTicketModal={showTicketModal}
										shipment_id={shipment_id}
										id={job_number}
										refetch={getPrePostShipmentQuotes}
									/>
								) : null}
							</div>
						) : null}

					</div>
				))
				: null
		}
		</>
	);
}
