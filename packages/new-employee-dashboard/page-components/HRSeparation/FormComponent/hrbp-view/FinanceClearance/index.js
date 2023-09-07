import { Button, Input } from '@cogoport/components';
import { IcMArrowRight, IcMDocument, IcMEyeopen } from '@cogoport/icons-react';
import React from 'react';

import StyledTable from '../../commons/StyledTable';
import Heading from '../HRMeeting/Heading';

import { fnfColumns, outstandingColumns } from './columns';
import styles from './styles.module.css';

const NUM = 1;
const data1 = [
	{
		companyLoan   : '500000',
		advanceAmount : '100000',
		status        : 'approved',
	},
];

const data2 = [
	{
		accountName    : 'XYZ',
		tenure         : '-',
		outstandingAmt : '100000',
		status         : 'pending',
		description    : 'salary',

	},
	{
		accountName    : 'XYZ',
		tenure         : '-',
		outstandingAmt : '100000',
		status         : 'pending',
		description    : 'salary',

	},
];

const URL = 'https://cogoport-production.sgp1.digitaloceanspaces.com/5b9d632d5221f50d4d4fbfc6d489c31b/sample.pdf';
const parts = URL.split('/');
const lastPart = parts[parts.length - NUM];

function FinanceClearance() {
	return (
		<>
			<Heading title="FINANCE CLEARANCE" />
			<div className={styles.container}>
				<div className={styles.heading}>
					A. Review FNF Status
				</div>
				<StyledTable columns={fnfColumns} data={data1} />
				<div className={styles.document_section}>
					<div className={styles.doc_heading}>FNF Excel Sheet</div>
					<Input
						size="md"
						placeholder={lastPart}
						prefix={<IcMDocument width={16} height={16} />}
						suffix={(
							<IcMEyeopen
								style={{ marginRight: '10px', cursor: 'pointer', color: 'black' }}
								onClick={() => window.open(URL, '_blank')}
							/>
						)}
						disabled
					/>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.heading}>
					B. Outstanding Amount
				</div>
				<StyledTable columns={outstandingColumns} data={data2} />
				<div className={styles.document_section}>
					<div className={styles.doc_heading}> Outstanding Excel Sheet</div>
					<Input
						size="md"
						placeholder={lastPart}
						prefix={<IcMDocument width={16} height={16} />}
						suffix={(
							<IcMEyeopen
								style={{ marginRight: '10px', cursor: 'pointer', color: 'black' }}
								onClick={() => window.open(URL, '_blank')}
							/>
						)}
						disabled
					/>
				</div>
			</div>

			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '4px' }}>Back</Button>
				<Button themeType="primary">
					Proceed
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

				</Button>
			</div>

		</>
	);
}

export default FinanceClearance;
