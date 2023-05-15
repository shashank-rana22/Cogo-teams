import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import AccordianView from '../../common/Accordianview';
import InvoicesTable from '../../common/InvoicesTable';
import TagMap from '../../common/Taggings/TagMap';
import invoiceconfiguration from '../../configurations/invoicetableconfig';
import useGetTaggingBills from '../../hooks/useGetMappings';

import styles from './styles.module.css';

function InvoicesUploaded({
	invoicesdata = {},
	collectionParty = {},
	setOpenComparision = () => {},
	setStep = () => {},
}) {
	const titleCard = <div>Invoice List & Tagging</div>;
	const [activeTab, setActiveTab] = useState('uploaded_invoices');

	const viewDetails = {
		Header   : '',
		accessor : (item) => (
			<div
				className={styles.value}
				onClick={() => {
					setStep(2);
					setOpenComparision(item);
				}}
				role="presentation"
			>
				{item.status !== 'init' ? 'View Details' : 'Map Line-Items'}
			</div>
		),
		id: 'view_details',
	};

	const { mappingsData, loading } = useGetTaggingBills({
		shipmentId: collectionParty?.shipment_id, serviceProviderId: collectionParty?.service_provider_id,
	});

	return (
		<div className={styles.invoicescontainer}>
			<span className={styles.headings}>Invoices Uploaded</span>
			<AccordianView title={titleCard} fullwidth>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					<TabPanel name="uploaded_invoices" title="Uploaded Invoices">
						<div className={styles.tablecontainer}>
							<InvoicesTable
								columns={[...invoiceconfiguration, viewDetails]}
								data={invoicesdata}
								showPagination={false}
							/>
						</div>
					</TabPanel>
					<TabPanel name="tagging_map" title="Tagging Map">
						<TagMap loading={loading} mappingsData={mappingsData} />
					</TabPanel>
				</Tabs>
			</AccordianView>
		</div>
	);
}

export default InvoicesUploaded;
