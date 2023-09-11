import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import StyledTable from '../../../common/StyledTable';
import { DOCUMENT_MAPPING } from '../../../utils/constants';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function Documents({ data: employeeData = {} }) {
	const { signed_documents, other_documents } = employeeData;
	const columns = [
		{
			Header   : 'NAME',
			accessor : (item) => (<div className={styles.table_item}>{item.name}</div>),
			id       : 'name',
		},
		{
			Header   : 'UPDATED AT',
			accessor : (item) => (<div className={styles.table_item}>{item.updatedAt}</div>),
			id       : 'updatedAt',
		},
		{
			Header   : 'ACTION',
			accessor : () => (
				<div className={styles.table_item}>
					<Button
						size="md"
						themeType="secondary"
						style={{ border: 'none', minWidth: '32px', height: 'fit-content', padding: '8px' }}
					>
						<IcMDownload width={14} height={14} />
					</Button>
					<Button
						size="md"
						themeType="secondary"
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<span className={styles.view_button}>View</span>

					</Button>
				</div>
			),
			id: 'action',
		},
	];

	const tablesData = [
		{
			heading : 'Employee Letters',
			data    : signed_documents.map((document) => ({
				name      : document.name,
				updatedAt : (document?.updated_at === undefined) ? ' — ' : formatDate({
					date       : document.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				}),
				url: document.document_url,
			})),
		},
		{
			heading : 'Other Documents',
			data    : other_documents.map((document) => ({
				name      : DOCUMENT_MAPPING[document.document_type],
				updatedAt : (document?.updated_at === undefined) ? ' — ' : formatDate({
					date       : document.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				}),
				url: document.document_url,
			})),
		},
	];

	const otherInfo = [
		{ label: 'Joining Date', key: 'processed', value: 'date_of_joining' },
		{ label: 'Age in Organsization', key: 'processed', value: 'age_in_organization' },
		{ label: 'Reports To', key: 'details', value: 'reporting_manager_name' },
		{ label: 'HRBP', key: 'details', value: 'hrbp_name' },
		{ label: 'Employee Code', key: 'details', value: 'employee_code' },
	];

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>EMPLOYMENT DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				{tablesData.map(
					({ heading, data }) => (
						<div className={styles.info_subcontainer} key={heading}>
							<span className={styles.info_heading}>{heading}</span>
							<StyledTable columns={columns} data={data} className="salary_table" />
						</div>
					),
				)}
			</div>
			<RightGlance otherInfo={otherInfo} data={employeeData} />
		</div>
	);
}

export default Documents;
