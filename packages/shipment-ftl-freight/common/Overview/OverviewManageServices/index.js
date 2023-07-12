import { Accordion, Tags } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetShipmentInvoice from '../../../hooks/useGetShipmentInvoice';
import { AdditionalServiceList } from '../../AdditionalServices';
import Services from '../Services';

import styles from './styles.module.css';

function OverviewManageServices({ isOpen = true, isPurchaseTab = false }) {
	const { data: invoiceData, loading } = useGetShipmentInvoice();
	const { invoicing_parties = [], reviewed_invoices } = invoiceData || {};
	const items = [
		{
			key      : '1',
			disabled : false,
			children : `${reviewed_invoices} / ${invoicing_parties.length} Sales Invoices Reviewed`,
			color    : '#EE3425',
			tooltip  : false,
		},
	];
	const getTitle = () => (
		<div className={styles.title}>Manage Services</div>
	);

	return (
		<Accordion title={getTitle()} isOpen={isOpen}>
			{!isPurchaseTab && <Services />}

			<AdditionalServiceList />
			{!loading && !isEmpty(invoiceData) && isPurchaseTab
						&& (
							<div className={styles.tags}>
								<Tags items={items} size="lg" />
							</div>
						) }
		</Accordion>
	);
}
export default OverviewManageServices;
