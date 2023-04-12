/* eslint-disable max-len */
import { Breadcrumb, Checkbox, Popover, Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../../commons/List';
import { CREATE_NEW_PAYRUN_CONFIG } from '../Columns/createNewPayRunConfig';
import { VIEW_SELECTED_CONFIG } from '../Columns/viewSelectedConfig';
import SelectFilters from '../SelectFilters';

import Footer from './Footer';
import AmountWithCurrency from './renderFunction/AmountWithCurrency';
import BankDetails from './renderFunction/BankDetails';
import DeleteModal from './renderFunction/DeleteModal/index';
import IncidentNumber from './renderFunction/IncidentNumber';
import InvoiceDetails from './renderFunction/InvoiceDetails';
import SIDnumber from './renderFunction/SIDnumber';
import styles from './styles.module.css';

const list = {
	list: [
		{
			incidentNumber : '5425365',
			sidNumber      : '529875',
			businessName   : 'Cogoport private Limited',
			advancedAmount : '20000000000',
			bankDetails    : {
				accountNo         : '914020036759730',
				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
				bankName          : 'AXIS BANK LTD',
				branchCode        : 'Dharavi',
				branchName        : null,
				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
				ifscCode          : 'UTIB0001701',
			},
			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

			],
		},
		{
			incidentNumber : '5425365',
			sidNumber      : '529875',
			businessName   : 'Cogoport private Limited',
			advancedAmount : '20000000000',
			bankDetails    : {
				accountNo         : '914020036759730',
				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
				bankName          : 'AXIS BANK LTD',
				branchCode        : 'Dharavi',
				branchName        : null,
				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
				ifscCode          : 'UTIB0001701',
			},
			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

			],
		},
		{
			incidentNumber : '5425365',
			sidNumber      : '529875',
			businessName   : 'Cogoport private Limited',
			advancedAmount : '20000000000',
			bankDetails    : {
				accountNo         : '914020036759730',
				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
				bankName          : 'AXIS BANK LTD',
				branchCode        : 'Dharavi',
				branchName        : null,
				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
				ifscCode          : 'UTIB0001701',
			},
			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

			],
		},
		{
			incidentNumber : '5425365',
			sidNumber      : '529875',
			businessName   : 'Cogoport private Limited',
			advancedAmount : '20000000000',
			bankDetails    : {
				accountNo         : '914020036759730',
				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
				bankName          : 'AXIS BANK LTD',
				branchCode        : 'Dharavi',
				branchName        : null,
				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
				ifscCode          : 'UTIB0001701',
			},
			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

			],
		},
		{
			incidentNumber : '5425365',
			sidNumber      : '529875',
			businessName   : 'Cogoport private Limited',
			advancedAmount : '20000000000',
			bankDetails    : {
				accountNo         : '914020036759730',
				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
				bankName          : 'AXIS BANK LTD',
				branchCode        : 'Dharavi',
				branchName        : null,
				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
				ifscCode          : 'UTIB0001701',
			},
			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

			],
		},
		{
			incidentNumber : '5425365',
			sidNumber      : '529875',
			businessName   : 'Cogoport private Limited',
			advancedAmount : '20000000000',
			bankDetails    : {
				accountNo         : '914020036759730',
				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
				bankName          : 'AXIS BANK LTD',
				branchCode        : 'Dharavi',
				branchName        : null,
				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
				ifscCode          : 'UTIB0001701',
			},
			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

			],
		},
		{
			incidentNumber : '5425365',
			sidNumber      : '529875',
			businessName   : 'Cogoport private Limited',
			advancedAmount : '20000000000',
			bankDetails    : {
				accountNo         : '914020036759730',
				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
				bankName          : 'AXIS BANK LTD',
				branchCode        : 'Dharavi',
				branchName        : null,
				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
				ifscCode          : 'UTIB0001701',
			},
			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

			],
		},
		{
			incidentNumber : '5425365',
			sidNumber      : '529875',
			businessName   : 'Cogoport private Limited',
			advancedAmount : '20000000000',
			bankDetails    : {
				accountNo         : '914020036759730',
				bankId            : '39c6e339-3ac7-4fb1-bce2-812ecaf1eef0',
				bankName          : 'AXIS BANK LTD',
				branchCode        : 'Dharavi',
				branchName        : null,
				collectionPartyId : 'ef38eefd-e141-404f-aa1e-e9298693304f',
				ifscCode          : 'UTIB0001701',
			},
			document: ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

			],
		},
	],
};

function CreateNewPayRun() {
	const [filters, setFilters] = useState({
		service: undefined,
	});

	const [viewSelectedInvoice, setViewSelectedInvoice] = useState(false);

	const functions = {
		// renderBankDetails: (itemData) => (
		// 	<BankDetails
		// 		itemData={itemData}
		// 		setEditedValue={setEditedValue}
		// 		setEditedTdsValue={setEditedTdsValue}
		// 		payrun_type={payrun_type}
		// 	/>
		// ),
		// renderRemarks: (itemData) => <Remark itemData={itemData} />,
		renderCheckbox: () => (
			<Checkbox
				value="check"
				disabled={false}
				// checked={isChecked}
				// onChange={() => onChangeTableBodyCheckbox(itemData)}
			/>

		),
		renderDocument: (itemData) => {
			const { document } = itemData || {};
			const content = document?.map((url:string) => (url !== '' ? (
				<div className={styles.document_number}>
					<a href={url} target="_blank" rel="noreferrer">
						{url?.split('/')?.pop() || '-'}
					</a>
				</div>
			) : (
				<span>No document available</span>
			)));
			return (
				<div className={styles.link}>
					<Popover placement="top" render={content}>
						{document?.length}
						{' '}
						{' '}
						document
					</Popover>
				</div>
			);
		},
		// renderTdsEdit: (itemData) => (
		// 	<EditTdsPayrun
		// 		setEditedTdsValue={setEditedTdsValue}
		// 		itemData={itemData}
		// 		setEditeableTds={setEditeableTds}
		// 		setRestTds={setRestTds}
		// 		viewSelectedInvoice={viewSelectedInvoice}
		// 		refetch={refetch}
		// 		setRefetch={setRefetch}
		// 		editKey="tdsValue"
		// 	/>
		// ),
		// renderEditIcon: (itemData) => (
		// 	<EditPayrun
		// 		setEditedValue={setEditedValue}
		// 		itemData={itemData}
		// 		setEditeable={setEditeable}
		// 		setRestValue={setRestValue}
		// 		viewSelectedInvoice={viewSelectedInvoice}
		// 		refetch={refetch}
		// 		setRefetch={setRefetch}
		// 		editKey="payableValue"
		// 	/>
		// ),
		// renderInvoiceDates: (itemData) => <InvoiceDates itemData={itemData} />,
		renderBankDetails : (itemData) => <BankDetails itemData={itemData} />,
		renderIcDelete    : () => (
			<DeleteModal />
		),
		// remarksRender: (itemData) => <Remark itemData={itemData} overflowDot />,
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
	};
	const getTableHeaderCheckbox = () => (
		<div className={styles.checkbox_style}>
			<Checkbox
				value="check"
				disabled={false}
			/>
		</div>
	);
	return (
		<div>
			<div className={styles.bread_crumb}>
				<Breadcrumb>
					<Breadcrumb.Item label="Advance Payments" />
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
				<div className={styles.card}>
					Month - January 2022
				</div>
				<div className={styles.card}>
					Entity - 301
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.filter}>
					<SelectFilters filters={filters} setFilters={setFilters} />
				</div>
				<div>
					<List itemData={list} config={viewSelectedInvoice ? VIEW_SELECTED_CONFIG : CREATE_NEW_PAYRUN_CONFIG} functions={functions} renderHeaderCheckbox={getTableHeaderCheckbox} />
				</div>
				<Footer viewSelectedInvoice={viewSelectedInvoice} setViewSelectedInvoice={setViewSelectedInvoice} />
			</div>

		</div>
	);
}

export default CreateNewPayRun;
