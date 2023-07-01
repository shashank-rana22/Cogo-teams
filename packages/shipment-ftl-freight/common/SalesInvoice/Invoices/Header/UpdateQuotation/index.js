import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useState, useContext } from 'react';

import useUpdateContractQuotation from '../../../../../hooks/useUpdateContractQuotation';

import styles from './styles.module.css';

const SOURCE = 'contract';

function UpdateQuotation({
	refetch = () => {},
	invoiceData = {},
}) {
	const [show, setShow] = useState(false);

	const { shipment_data = {} } = useContext(ShipmentDetailContext);
	const { source = '' } = shipment_data;

	const invoiceStatus = invoiceData?.invoicing_parties.some(
		(item) => item?.status === 'pending',
	);

	const { loading, updateContractQuotation } = useUpdateContractQuotation({
		shipment_id: shipment_data?.id,
		refetch,
		setShow,
	});

	const showFtlUpdateQuotationButton = source === SOURCE && invoiceStatus;

	return (
		<div style={{ marginLeft: '10px' }}>
			{showFtlUpdateQuotationButton ? (
				<Button
					size="sm"
					onClick={() => setShow(true)}
					disabled={loading}
					themeType="primary"
				>
					Refetch Contract Rates
				</Button>
			) : null}

			<Modal
				show={show}
				onClose={() => setShow(false)}
				closable={false}
				onOuterClick={() => setShow(false)}
			>
				<div className={styles.container}>
					<h1>Warning</h1>
					<div className={styles.text}>Refetching will delete all the additional services rates</div>
					<div className={styles.button_wrap}>
						<Button
							size="lg"
							themeType="secondary"
							style={{ marginRight: '24px' }}
							disabled={loading}
							onClick={() => setShow(false)}
						>
							Cancel
						</Button>
						<Button
							size="lg"
							themeType="primary"
							disabled={loading}
							onClick={() => updateContractQuotation()}
						>
							Refetch
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default UpdateQuotation;
