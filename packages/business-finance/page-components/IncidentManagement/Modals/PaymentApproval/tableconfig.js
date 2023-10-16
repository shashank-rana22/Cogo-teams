import { Input, RadioGroup, Textarea } from '@cogoport/components';

import styles from './styles.module.css';

const NOT_FOUND = -1;

const getOptionsData = ({ incidentStatus }) => [
	{
		label    : 'Approve',
		value    : 'APPROVED',
		name     : '',
		disabled : incidentStatus !== 'REQUESTED',
	},
	{
		label    : 'Reject',
		value    : 'REJECTED',
		name     : '',
		disabled : incidentStatus !== 'REQUESTED',
	}];

const handleApiAmount = ({ key, val, id, setApiData }) => {
	setApiData((prevData) => {
		const newData = [...prevData];
		const index = newData.findIndex((detail) => (detail.id === id));
		if (index !== NOT_FOUND) {
			newData[index] = { ...(newData[index] || {}), [key]: key === 'amount' ? +val : val };
		}
		return newData;
	});
};

export const paymentApprovalColumns = ({
	setApiData = () => {},
	incidentStatus = '',
}) => [
	{
		Header   : 'UTR Number',
		accessor : (row) => (
			row?.document_url
				? (
					<a href={row?.document_url} target="_blank" rel="noreferrer" className={styles.link}>
						{row?.utr_number || ''}
					</a>
				) : row?.utr_number),
		id: 'utrNumber',
	},
	{
		Header   : 'Currency',
		accessor : (row) => (
			<div className={styles.input}>
				{row?.currency || ''}
			</div>
		),
		id: 'currency',
	},
	{
		Header   : 'Amount',
		accessor : (row) => (
			<div className={styles.input}>
				<Input
					onChange={(val) => handleApiAmount({ val, id: row?.id, key: 'amount', setApiData })}
					placeholder="Amount"
					type="number"
					value={row?.amount || ''}
					disabled={incidentStatus !== 'REQUESTED'}
				/>
			</div>
		),
		id: 'amount',
	},
	{
		Header   : '',
		accessor : (row) => (
			<div className={styles.radio}>
				<RadioGroup
					options={getOptionsData({ incidentStatus })}
					onChange={(val) => handleApiAmount({ val, id: row?.id, key: 'status', setApiData })}
					value={row?.status}
				/>
			</div>
		),
		id: 'action',
	},
	{
		Header   : '',
		accessor : (row) => (
			<Textarea
				name="remark"
				size="sm"
				placeholder="Enter Remarks Here..."
				onChange={(val) => handleApiAmount({ val, id: row?.id, key: 'remarks', setApiData })}
				value={row?.remarks}
				style={{ height: '40px' }}
				disabled={incidentStatus !== 'REQUESTED'}
			/>
		),
		id: 'text',
	},
];
