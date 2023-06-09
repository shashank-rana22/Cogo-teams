import { Button, Modal, Select } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import FooterButtonWrapper from '@cogoport/surface-modules/common/FooterButtonWrapper';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateCurrency from '../../../../../../../hooks/useUpdateCurrency';
import INVOICE_CURRENCY_MAPPINGS from '../../../../../helpers/invoiceCurrencyMapping';

import styles from './styles.module.css';

function ChangeCurrency({
	setShowModal = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const onClose = () => {
		setShowModal(false);
	};
	const [value, setValue] = useState('');

	const geo = getGeoConstants();

	const currencyOptionsOld =	INVOICE_CURRENCY_MAPPINGS?.freight_invoice_currency?.[
		invoice?.country_code || geo.country.currency.code
	] || INVOICE_CURRENCY_MAPPINGS?.freight_invoice_currency?.others;

	const currencyOptions = currencyOptionsOld.map((item) => ({
		label : item,
		value : item,
	}));

	const payload = {
		id               : invoice?.id,
		invoice_currency : value,
		shipment_id      : invoice.shipment_id,
	};

	const refetchAfterCall = () => {
		if (onClose) {
			onClose();
		}
		refetch();
	};

	const { onCreate, loading } = useUpdateCurrency({
		refetch  : refetchAfterCall,
		currency : invoice?.invoice_currency,
	});

	return (
		<Modal
			className={styles.form}
			show
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			<Modal.Header title="CHANGE CURRENCY" />
			<Modal.Body>
				<div>Select Currency</div>
				<Select
					value={value}
					onChange={setValue}
					placeholder="Select Currency"
					options={currencyOptions}
					size="md"
					className={styles.select_div}
				/>
			</Modal.Body>
			<Modal.Footer>
				<FooterButtonWrapper>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setShowModal(false)}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						size="md"
						themeType="primary"
						onClick={() => onCreate(payload)}
						disabled={loading || isEmpty(value)}
					>
						Confirm
					</Button>
				</FooterButtonWrapper>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeCurrency;
