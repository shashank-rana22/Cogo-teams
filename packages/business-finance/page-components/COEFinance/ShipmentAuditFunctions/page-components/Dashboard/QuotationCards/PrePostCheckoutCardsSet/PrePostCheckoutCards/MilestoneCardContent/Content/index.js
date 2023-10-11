import { Table, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import RaiseTicketModal from '../../../../../../../commons/RaiseTicketModal';
import getServiceColumns from '../../../../../../../configurations/getServiceColumns';

import Services from './Services';
import styles from './styles.module.css';

const NEXT = 1;

export default function Content({
	services = {},
	currentKey = '',
	accordionState = {},
	toggleAccordion = () => {},
	getPrePostShipmentQuotes = () => {},
}) {
	const keys = Object.keys(accordionState);
	const nextIndex = keys.indexOf(currentKey) + NEXT;
	const nextItem = (nextIndex < (keys.length - NEXT)) ? keys[nextIndex] : '';
	const defaultSelectedService = Object.keys(services)?.[GLOBAL_CONSTANTS.zeroth_index] || '';

	const { query: { job_number = '' } } = useRouter();

	const [showTicketModal, setShowTicketModal] = useState(false);
	const [activeService, setActiveService] = useState(defaultSelectedService);
	const handleServiceClick = (service) => {
		setActiveService(service);
	};

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
								data={item?.lineItems || []}
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

						{(!item?.modifiedBy && item?.quotationState !== 'APPROVED') ? (
							<div className={styles.flex_content}>
								<div />
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
											// itemData={data}
											id={job_number}
										/>
									) : null}
									<Button
										size="md"
										themeType="primary"
										// onClick={() => { setQueryModalShow(true); setButtonClicked('Accept'); }}
									>
										Accept
									</Button>

								</div>
							</div>
						) : null}

					</div>
				))
				: null
		}
		</>
	);
}
