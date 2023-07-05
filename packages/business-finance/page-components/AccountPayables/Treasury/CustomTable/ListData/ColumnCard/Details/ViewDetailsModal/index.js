import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import StyledTable from '../../../../../../../commons/StyledTable/index.tsx';
import AllotedConfig from '../../../../../Configuration/AllotedConfig';
import RequestedConfig from '../../../../../Configuration/RequestedConfig';

import styles from './styles.module.css';

function ViewDetailsModal({
	year,
	fundAllocationDetails,
	selectedCurrency,
	monthName,
	activeTime,
	date,
	bankData,
	activeEntityCode,
	showMore,
	setShowMore,
	loading,
}) {
	const { bankName, accountNumber } = bankData || {};

	return (
		<Modal
			size="xl"
			show={showMore}
			onClose={() => {
				setShowMore(false);
			}}
		>
			<Modal.Header title={(
				<div className={styles.style_header}>
					<div className={styles.header_text}>VIEW DETAILS - </div>
					<div className={styles.value_text}>
						{activeTime === 'day'
							? formatDate({
								date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})
							: `${monthName} ${year} `}
						- ENTITY
						{' '}
						{activeEntityCode}
						{' '}
						-
						{' '}
						{bankName}
						{' '}
						-
						{' '}
						{accountNumber}
					</div>
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.style_Table}>

					<div className={styles.card_list}>
						<StyledTable
							data={fundAllocationDetails}
							columns={RequestedConfig({ selectedCurrency })}
							loading={loading}
							imageFind="FinanceDashboard"
						/>
					</div>
					<div className={styles.card_list}>
						<StyledTable
							data={fundAllocationDetails}
							columns={AllotedConfig({ selectedCurrency })}
							loading={loading}
							imageFind="FinanceDashboard"
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					onClick={() => setShowMore(false)}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ViewDetailsModal;
