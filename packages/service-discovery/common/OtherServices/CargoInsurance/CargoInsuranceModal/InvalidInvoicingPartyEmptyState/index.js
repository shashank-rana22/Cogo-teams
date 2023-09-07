import { Button } from '@cogoport/components';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

import styles from './styles.module.css';

function InvalidInvoicingPartyEmptyState({
	importer_exporter_country_id = '',
	setAddCargoInsurance = () => {},
	setShowAddInvoicingParty = () => {},
}) {
	const countryDetails = getCountryDetails({
		country_id: importer_exporter_country_id,
	});

	const stepsMapping = {
		Step1 : `Add an Invoicing Party registered in ${countryDetails?.name} and Submit.`,
		Step2 : 'Additional Services -> Add Cargo Insurance',
	};

	return (
		<div className={styles.container}>
			<div className={styles.text_container}>
				<div className={styles.text}>
					Note:- You have selected Cargo Insurance service for shipment. To
					continue, please select an invoicing party registered in
					{' '}
					{countryDetails?.name}
					{' '}
					for this service.
				</div>

				<div className={styles.steps_text}>Steps to add Cargo Insurance Service :- </div>

				{Object.keys(stepsMapping).map((steps) => (
					<div className={styles.steps_text} key={steps}>
						{steps}
						{' '}
						:
						{stepsMapping[steps]}
					</div>
				))}
			</div>

			<Button
				type="button"
				themeType="primary"
				size="md"
				onClick={() => {
					setShowAddInvoicingParty(true);
					setAddCargoInsurance(false);
				}}
			>
				+Add Invoicing Party
			</Button>
		</div>
	);
}
export default InvalidInvoicingPartyEmptyState;
