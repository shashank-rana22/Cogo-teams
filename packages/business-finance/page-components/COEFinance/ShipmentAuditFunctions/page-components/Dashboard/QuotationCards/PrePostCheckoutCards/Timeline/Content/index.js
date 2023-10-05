import { Table, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React, { useState } from 'react';

// import RemarkModal from '../../../../../../commons/RemarkModal';
import getServiceColumns from '../../../../../../configurations/getServiceColumns';

import RemarkModal from './RemarkModal';
import Services from './Services';
import styles from './styles.module.css';

const NEXT = 1;
const TABLE_COLUMNS = getServiceColumns();

export default function Content({
	services,
	currentKey,
	accordionState,
	toggleAccordion,
	getPrePostShipmentQuotes,
}) {
	const keys = Object.keys(accordionState);
	const nextIndex = keys.indexOf(currentKey) + NEXT;
	const nextItem = (nextIndex < (keys.length - NEXT)) ? keys[nextIndex] : '';
	const defaultSelectedService = Object.keys(services)?.[GLOBAL_CONSTANTS.zeroth_index] || '';
	const [queryModalShow, setQueryModalShow] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');
	const [activeService, setActiveService] = useState(defaultSelectedService);
	const [buttonClicked, setButtonClicked] = useState('');
	const handleServiceClick = (service) => {
		setActiveService(service);
	};
	// console.log({ services });
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
							<Table columns={TABLE_COLUMNS} data={item?.lineItems || []} />
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
												// timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
												formatType : 'date',
											// separator  : 'T',
											})}
										</div>
									</div>
								</div>
							)
							: null}

						{(!item?.modifiedBy && item?.quotationState !== 'APPROVED') ? (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div />
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<Button
										size="md"
										themeType="secondary"
										style={{ marginRight: '10px' }}
										onClick={() => { setQueryModalShow(true); setButtonClicked('Query'); }}
									>
										Raise Query
									</Button>

									<RemarkModal
										remarkValue={remarkValue}
										setRemarkValue={setRemarkValue}
										queryModalShow={queryModalShow}
										setQueryModalShow={setQueryModalShow}
										buttonClicked={buttonClicked}
										setButtonClicked={setButtonClicked}
										toggleAccordion={toggleAccordion}
										currentKey={currentKey}
										nextKey={nextItem}
										item={item}
										getPrePostShipmentQuotes={getPrePostShipmentQuotes}
									/>
									<Button
										size="md"
										themeType="primary"
										onClick={() => { setQueryModalShow(true); setButtonClicked('Accept'); }}
									>
										Accept
									</Button>

									<RemarkModal
										remarkValue={remarkValue}
										setRemarkValue={setRemarkValue}
										queryModalShow={queryModalShow}
										setQueryModalShow={setQueryModalShow}
										buttonClicked={buttonClicked}
										setButtonClicked={setButtonClicked}
										toggleAccordion={toggleAccordion}
										currentKey={currentKey}
										nextKey={nextItem}
										item={item}
										getPrePostShipmentQuotes={getPrePostShipmentQuotes}
									/>
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
