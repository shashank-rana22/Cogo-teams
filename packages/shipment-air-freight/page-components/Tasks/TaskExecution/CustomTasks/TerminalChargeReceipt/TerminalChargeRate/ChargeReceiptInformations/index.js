import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import useCreateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../../hooks/useCreateShipmentAirFreightConsolidatedInvoice';

import controls from './controls';
import styles from './styles.module.css';

function ChargeReceiptInformations({
	index = 0,
	type = 'terminal',
	control = {},
	errors = {},
	setValue = () => {},
	csr_data = {},
	handleSubmit = () => {},
	mainServicesData = {},
	sheetData = {},
	entityData = {},
	collectionPartyData = {},
	setTerminalChargeState = () => {},
	setInvoiceData = () => {},
	setTcValues = () => {},
}) {
	const {
		loading: consolidatedInvoiceLoading,
		createShipmentAirFreightConsolidatedInvoice,
	} = useCreateShipmentAirFreightConsolidatedInvoice({
		type,
		index,
		mainServicesData,
		sheetData,
		entityData,
		collectionPartyData,
		setTerminalChargeState,
		setInvoiceData,
	});

	const handleUpload = (values) => {
		setTcValues(values);
		createShipmentAirFreightConsolidatedInvoice(values);
	};

	useEffect(() => {
		const { ocr_data = {} } = csr_data || {};
		const { amount = 0, tax = 0, total_amount = 0, invoice_number = 0 } = ocr_data || {};
		setValue(`price_${index}`, amount ? Number(amount) : null);
		setValue(`tax_price_${index}`, tax ? Number(tax) : null);
		setValue(`total_tax_price_${index}`, total_amount ? Number(total_amount) : null);
		setValue(`csr_reference_number_${index}`, invoice_number ? Number(invoice_number) : null);
	}, [csr_data, index, setValue]);

	return (
		<div>
			<Layout
				fields={controls({ index })}
				control={control}
				errors={errors}
			/>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="accent"
					onClick={handleSubmit(handleUpload)}
					disabled={consolidatedInvoiceLoading}
				>
					Initiate Invoice

				</Button>
			</div>
		</div>
	);
}
export default ChargeReceiptInformations;
