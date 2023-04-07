import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Card from '../Card';

import Detail from './Detail';
import styles from './styles.module.css';

function InvoicingParty({ tradePartnersData = {} }) {
	const [show, setShow] = useState({});
	const { invoicing_parties_details = [] } = tradePartnersData;
	const invoicePartyLength = invoicing_parties_details.length;

	return (invoicing_parties_details.map((invoiceParty, index) => {
		const { business_name = '', services = [], poc_data = [] } = invoiceParty;
		const format_services = services.map((t) => startCase(t)).join(', ');

		return	(
			<Card title={`Invoicing Party ${invoicePartyLength <= 1 ? '' : index + 1}`}>
				<div className={styles.header}>
					<div className={styles.party_name}>{business_name}</div>
					<div>
						<Button
							themeType="linkUi"
							onClick={() => { setShow({ ...show, [business_name]: !show[business_name] }); }}
						>
							{show[business_name] ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
						</Button>

					</div>
				</div>
				<div className={styles.service_container}>
					<div className={styles.service}>Services :</div>
					<div className={styles.service_names}>{format_services}</div>
				</div>
				{show[business_name] ? <Detail data={poc_data} /> : null}
			</Card>
		);
	})

	);
}
export default InvoicingParty;
