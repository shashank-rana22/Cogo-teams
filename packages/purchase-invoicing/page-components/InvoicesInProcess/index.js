import React from 'react';

import AccordianView from '../../common/Accordianview';
import InvoicesTable from '../../common/InvoicesTable';
import invoiceconfiguration from '../../configurations/invoicetableconfig';

import styles from './styles.module.css';

function InvoicesInProcess({ invoicesdata }) {
	const titleCard = <div>Invoice In Process</div>;

	const viewDetails = {
		Header   : '',
		accessor : () => (
			<div className={`${styles.value} ${styles.underline}`}>
				Map Line-Items
			</div>
		),
		id: 'view_details',
	};

	const editableData = invoicesdata?.filter((invoice) => !(['coe_approved', 'locked'].includes(invoice?.status)));
	return (
		<div className={styles.invoicescontainer}>
			<span className={styles.headings}>Invoice In Process</span>
			<AccordianView title={titleCard} fullwidth>
				<div className={styles.tablecontainer}>
					<InvoicesTable
						columns={[...invoiceconfiguration, viewDetails]}
						data={editableData}
						showPagination={false}
					/>
				</div>
			</AccordianView>
		</div>
	);
}

export default InvoicesInProcess;
