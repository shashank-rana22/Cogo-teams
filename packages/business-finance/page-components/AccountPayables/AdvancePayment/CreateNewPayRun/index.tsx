/* eslint-disable max-len */
import { Breadcrumb, Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import React, { useState } from 'react';

import List from '../../../commons/List';
import { CREATE_NEW_PAYRUN_CONFIG } from '../Columns/createNewPayRunConfig';
import { VIEW_SELECTED_CONFIG } from '../Columns/viewSelectedConfig';
// import useGetAdvancePaymentList from '../hooks/useGetAdvancePaymentList';
import useGetAdvancePaymentList from '../hooks/useGetAdvancePaymentList';
import SelectFilters from '../SelectFilters';

import Footer from './Footer';
import AmountWithCurrency from './renderFunction/AmountWithCurrency';
import BankDetails from './renderFunction/BankDetails';
import DeleteModal from './renderFunction/DeleteModal/index';
import IncidentNumber from './renderFunction/IncidentNumber';
import InvoiceDetails from './renderFunction/InvoiceDetails';
import OrganizationName from './renderFunction/OrganizationName';
import SIDnumber from './renderFunction/SIDnumber';
import styles from './styles.module.css';

// const list1 = {
// 	list: [
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			bankDetails    : {
// 				accountNo         : '914020036759730',
// 				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
// 				bankName          : 'AXIS BANK LTD',
// 				branchCode        : 'Dharavi',
// 				branchName        : null,
// 				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
// 				ifscCode          : 'UTIB0001701',
// 			},
// 			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			bankDetails    : {
// 				accountNo         : '914020036759730',
// 				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
// 				bankName          : 'AXIS BANK LTD',
// 				branchCode        : 'Dharavi',
// 				branchName        : null,
// 				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
// 				ifscCode          : 'UTIB0001701',
// 			},
// 			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			bankDetails    : {
// 				accountNo         : '914020036759730',
// 				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
// 				bankName          : 'AXIS BANK LTD',
// 				branchCode        : 'Dharavi',
// 				branchName        : null,
// 				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
// 				ifscCode          : 'UTIB0001701',
// 			},
// 			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			bankDetails    : {
// 				accountNo         : '914020036759730',
// 				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
// 				bankName          : 'AXIS BANK LTD',
// 				branchCode        : 'Dharavi',
// 				branchName        : null,
// 				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
// 				ifscCode          : 'UTIB0001701',
// 			},
// 			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			bankDetails    : {
// 				accountNo         : '914020036759730',
// 				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
// 				bankName          : 'AXIS BANK LTD',
// 				branchCode        : 'Dharavi',
// 				branchName        : null,
// 				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
// 				ifscCode          : 'UTIB0001701',
// 			},
// 			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			bankDetails    : {
// 				accountNo         : '914020036759730',
// 				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
// 				bankName          : 'AXIS BANK LTD',
// 				branchCode        : 'Dharavi',
// 				branchName        : null,
// 				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
// 				ifscCode          : 'UTIB0001701',
// 			},
// 			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			bankDetails    : {
// 				accountNo         : '914020036759730',
// 				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
// 				bankName          : 'AXIS BANK LTD',
// 				branchCode        : 'Dharavi',
// 				branchName        : null,
// 				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
// 				ifscCode          : 'UTIB0001701',
// 			},
// 			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			bankDetails    : {
// 				accountNo         : '914020036759730',
// 				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
// 				bankName          : 'AXIS BANK LTD',
// 				branchCode        : 'Dharavi',
// 				branchName        : null,
// 				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
// 				ifscCode          : 'UTIB0001701',
// 			},
// 			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 	],
// };

function CreateNewPayRun() {
	const [sort, setSort] = useState({});
	const {
		filters, setFilters, data, loading, entity,
		apiData,
		submitSelectedInvoices, getTableBodyCheckbox,
		getTableHeaderCheckbox,
		viewSelectedData,
		viewSelectedDataLoading,
		getViewSelectedInvoices,
	} = useGetAdvancePaymentList({ sort });
	const { pageIndex } = data || {};

	console.log(viewSelectedData, 'viewSelectedData');
	const [viewSelectedInvoice, setViewSelectedInvoice] = useState(false);

	const functions = {
		renderCheckbox    : (itemData) => getTableBodyCheckbox(itemData),
		renderBankDetails : (itemData) => <BankDetails itemData={itemData} />,
		renderIcDelete    : () => (
			<DeleteModal />
		),
		renderInvoiceDetails: () => (
			<InvoiceDetails />
		),
		renderAmountWithCurrency: (itemData) => (
			<AmountWithCurrency itemData={itemData} />
		),
		renderIncidentNumber: (itemData) => (
			<IncidentNumber itemData={itemData} />
		),
		renderSIDnumber: (itemData) => (
			<SIDnumber itemData={itemData} />
		),
		renderOrganization: (itemData) => (
			<OrganizationName itemData={itemData} />
		),
	};
	return (
		<div>
			<div className={styles.bread_crumb}>
				<Breadcrumb>
					<Breadcrumb.Item label={(
						<Link href="/business-finance/account-payables/advance-payment">
							Advance Payment
						</Link>
					)}
					/>
					<Breadcrumb.Item label="PayRun Creation" />
					<Breadcrumb.Item label="Select Invoices" />
				</Breadcrumb>
			</div>
			{viewSelectedInvoice
			&& (
				<div className={styles.back}>
					<div>
						<IcMArrowBack height={20} width={20} />
					</div>
					<div>
						<Button size="lg" themeType="linkUi" onClick={() => { setViewSelectedInvoice(false); }}>
							<div className={styles.button}>
								Go back to invoice selection
							</div>
						</Button>
					</div>
				</div>
			)}
			<div className={styles.select_card}>
				{/* <div className={styles.card}>
					Month - January 2022
				</div> */}
				<div className={styles.card}>
					Entity -
					{' '}
					{entity}
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.filter}>
					<SelectFilters filters={filters} setFilters={setFilters} />
				</div>
				<div>
					<List
						itemData={viewSelectedInvoice ? viewSelectedData : data}
						loading={viewSelectedInvoice ? viewSelectedDataLoading : loading}
						config={viewSelectedInvoice ? VIEW_SELECTED_CONFIG : CREATE_NEW_PAYRUN_CONFIG}
						functions={functions}
						renderHeaderCheckbox={getTableHeaderCheckbox}
						sort={sort}
						setSort={setSort}
						page={pageIndex}
						pageSize={10}
						handlePageChange={(val: number) => setFilters({
							...filters,
							pageIndex: val,
						})}
						showPagination
					/>
				</div>
				<Footer
					apiData={apiData}
					viewSelectedInvoice={viewSelectedInvoice}
					setViewSelectedInvoice={setViewSelectedInvoice}
					submitSelectedInvoices={submitSelectedInvoices}
					getViewSelectedInvoices={getViewSelectedInvoices}
				/>
			</div>

		</div>
	);
}

export default CreateNewPayRun;
