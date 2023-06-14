import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const INVOICE_COLUMNS = [
	['Service'],
	['Billing Party Name', 'Invoicing Party', 'Email'],
	['Billing Party Address', 'Name', 'Contact Number'],
];

function Details({ data = [], setShowForm = () => {} }) {
	const mapping = (val) => ({
		Service                 : startCase(val.invoice_preference_service || ''),
		'Billing Party Name'    : val.billing_party || '',
		'Invoicing Party'       : startCase(val.invoicing_party || ''),
		Email                   : val.invoice_preference_email || '',
		'Billing Party Address' : val.billing_party_address || '',
		Name                    : val.invoice_preference_name,
		'Contact Number':
		`${val?.invoice_preference_country_code || ''} ${val?.invoice_preference_contact_no || ''}`,
	});

	function LabelValue({ label, value }) {
		return !isEmpty(value) ? (
			<>
				<div className={styles.label}>{label}</div>
				<div className={styles.value}>{value}</div>
			</>
		) : null;
	}

	return (
		<div>
			<div className={styles.heading}>
				<div>Preferred Invoice Partners</div>
				<div className={styles.actions}>
					<div className={styles.edit}>
						<Button
							onClick={() => setShowForm('add')}
							themeType="accent"
							size="sm"
						>
							Add
						</Button>
					</div>

					<div>
						<Button
							onClick={() => setShowForm('edit')}
							themeType="accent"
							size="sm"
						>
							Edit
						</Button>
					</div>
				</div>
			</div>

			<div>
				{isEmpty(data)
					? <div className={styles.no_data}>No data available</div>
					: data.map((item) => {
						const mapping_data = mapping(item?.sop_detail || {});

						return (
							<div className={styles.each_pref} key={item?.id}>
								{INVOICE_COLUMNS.map((col) => (
									<div className={styles.columns} key={col?.[GLOBAL_CONSTANTS.zeroth_index]}>
										{col.map((key) => (
											<LabelValue
												key={key}
												label={key}
												value={mapping_data[key]}
											/>
										))}
									</div>
								))}
							</div>
						);
					})}
			</div>

		</div>
	);
}

export default Details;
