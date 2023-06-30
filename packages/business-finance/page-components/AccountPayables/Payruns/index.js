import React, { useState } from 'react';

import List from '../../commons/List/index.tsx';
import RenderTooltip from '../../commons/RenderTooltip/index';
import InvoiceDetailsTimeLine from '../Invoices/InvoiceTable/RenderFunctions/InvoiceDetailsTimeLine';

import Header from './Header';
import useFilterData from './hooks/useFilterData';
import BankDetails from './renderFunction/BankDetails';
import DeletePayrun from './renderFunction/DeletePayrun';
import FormatAmountCurrency from './renderFunction/FormatAmountCurrency';
import RibbonData from './renderFunction/RibbonData/index';
import ShowAction from './renderFunction/ShowAction';
import UrgencyTag from './renderFunction/UrgencyTag';
import ViewInvoices from './renderFunction/ViewInvoice';
import styles from './styles.module.css';

function Payruns() {
	const [activePayrunTab, setActivePayrunTab] = useState('INITIATED');
	const [isInvoiceView, setIsInvoiceView] = useState(false);
	const {
		data,
		loading,
		payrunStats,
		config,
	} = useFilterData({ isInvoiceView, activePayrunTab });

	const functions = {
		renderFormatedAmount: (itemData) => (
			<FormatAmountCurrency itemData={itemData} />
		),
		renderTrashInvoice: () => (
			<DeletePayrun />
		),
		renderViewInvoice: (itemData) => (
			<ViewInvoices itemData={itemData} />
		),
		renderRibbon: (itemData) => (
			<RibbonData itemData={itemData} />
		),
		renderTooltip: (itemData) => {
			const { organizationName } = itemData || {};
			return (
				<RenderTooltip content={organizationName} maxLength={12} />
			);
		},
		renderInvoiceTimeLine: (itemData) => (
			<InvoiceDetailsTimeLine item={itemData} />
		),
		renderAction: (itemData) => (
			<ShowAction itemData={itemData} />
		),
		renderBankDetails: (itemData) => (
			<BankDetails itemData={itemData} />
		),
		renderUrgencyData: (itemData) => (
			<UrgencyTag itemData={itemData} />
		),
	};
	return (

		<div className={styles.container}>
			<Header
				activePayrunTab={activePayrunTab}
				setActivePayrunTab={setActivePayrunTab}
				payrunStats={payrunStats}
				isInvoiceView={isInvoiceView}
				setIsInvoiceView={setIsInvoiceView}
			/>

			<List itemData={data} config={config} loading={loading} functions={functions} />
		</div>
	);
}

export default Payruns;
