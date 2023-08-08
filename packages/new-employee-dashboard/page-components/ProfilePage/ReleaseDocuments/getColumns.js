import { Checkbox, Button, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({
	showSaveButton,
	btnloading,
	createEmployeeSignedDocumentsStatus,
	handleCheckboxChange,
	signedDocumentsList,
	setAdditionalClause,
}) => [
	{
		id     : 'action',
		Header : showSaveButton ? (
			<Button
				loading={btnloading}
				onClick={() => createEmployeeSignedDocumentsStatus()}
			>
				Send Document(s) to Sign
			</Button>
		) : (
			<div className={styles.action_container}>ACTION</div>
		),
		accessor: (item) => (
			<div>
				<Checkbox
					value={item?.name}
					onChange={(event) => handleCheckboxChange(item, event.target.checked)}
					disabled={signedDocumentsList.includes(item?.name)}
					checked={signedDocumentsList.includes(item?.name) === true ? true : null}
				/>
			</div>
		),
	},
	{
		Header   : 'DOCUMENT NAME',
		accessor : (item) => (
			<div>{startCase(item?.name) || '-'}</div>
		),
	},
	{
		Header   : 'ADD ADDITIONAL CLAUSES',
		accessor : (item) => {
			const disabled = (signedDocumentsList || []).includes(item?.name);

			return (
				item?.name === 'Employment Agreement'
					? (
						<Button
							size="md"
							themeType="secondary"
							onClick={() => setAdditionalClause(item?.name)}
							disabled={disabled}
						>
							{disabled ? 'Document already sent' : 'Add'}
						</Button>
					)
					: '-'
			);
		},
	},
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<div>
				<Pill
					size="md"
					color={signedDocumentsList.includes(item?.name) === true ? '#C4DC91' : '#FFCBD1'}
				>
					{signedDocumentsList.includes(item?.name) === true
						? 'Document Generated' : 'Document not Generated'}
				</Pill>
			</div>
		),
	},
];

export default getColumns;
