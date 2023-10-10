import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import AccordianView from '../../common/Accordianview';
import InvoicesTable from '../../common/InvoicesTable';
import TagMap from '../../common/Taggings/TagMap';
import invoiceconfiguration from '../../configurations/invoicetableconfig';
import useGetTaggingBills from '../../hooks/useGetMappings';
import useGetUtrDetails from '../../hooks/useGetUtrDetails';

import styles from './styles.module.css';

const STEP = 2;

function InvoicesUploaded({
	invoicesdata = {},
	collectionParty = {},
	setOpenComparision = () => { },
	setStep = () => { },
}) {
	const [activeTab, setActiveTab] = useState('uploaded_invoices');

	const viewDetails = {
		Header   : '',
		accessor : (item) => (
			<div
				className={styles.value}
				onClick={() => {
					setStep(STEP);
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

	const invoices_bill_ids = invoicesdata.map((invoice) => (invoice?.finance_job_number || invoice?.billId));

	const { utrData = [], loading: utrLoading } = useGetUtrDetails({ billIds: invoices_bill_ids });

	return (
		<div className={styles.invoicescontainer}>
			<span className={styles.headings}>Invoices Uploaded</span>
			<AccordianView title="Invoice List & Tagging" fullwidth>
				<div className={styles.tabscontainer}>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel name="uploaded_invoices" title="Uploaded Invoices">
							<div className={styles.tablecontainer}>
								<InvoicesTable
									columns={[...(invoiceconfiguration({ utrData, utrLoading })), viewDetails]}
									data={invoicesdata}
									showPagination={false}
								/>
							</div>
						</TabPanel>
						<TabPanel name="tagging_map" title="Tagging Map">
							<TagMap loading={loading} mappingsData={mappingsData} />
						</TabPanel>
					</Tabs>
				</div>
			</AccordianView>
		</div>
	);
}

export default InvoicesUploaded;
