import React, { useState } from 'react';

import List from '../../commons/List/index.tsx';

import Header from './Header';
import useGetPayrun from './hooks/useGetPayrun';
import DeletePayrun from './renderFunction/DeletePayrun';
import FormatAmountCurrency from './renderFunction/FormatAmountCurrency';
import ViewInvoices from './renderFunction/ViewInvoice';
import styles from './styles.module.css';

function Payruns({ activeEntity }) {
	const [activePayrunTab, setActivePayrunTab] = useState('INITIATED');
	const { data, loading, config, payrunStats } = useGetPayrun({ activePayrunTab });
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
	};
	return (

		<div className={styles.container}>
			<Header
				activePayrunTab={activePayrunTab}
				setActivePayrunTab={setActivePayrunTab}
				payrunStats={payrunStats}
			/>

			<List itemData={data} config={config} loading={loading} functions={functions} />
		</div>
	);
}

export default Payruns;
