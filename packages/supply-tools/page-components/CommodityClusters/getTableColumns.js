import { Button } from '@cogoport/components';
import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CommodityFormat({ commodities = {} }) {
	return (
		<div>
			{Object.keys(commodities || {}).map((key) => (
				<div key={key}>
					<div className={styles.commodity_label}>
						{startCase(key)}
						{' '}
						:
					</div>
					<span>
						{commodities[key].map((i) => COMMODITY_NAME_MAPPING?.[i]?.name).join(', ')}
					</span>
				</div>
			))}
		</div>
	);
}

function ActionFormat({ onUpdate = () => {}, onDelete = () => {}, row = {} }) {
	return (
		<div className={styles.action_container}>
			<Button onClick={() => onUpdate(row)}>Update</Button>
			<Button onClick={() => onDelete(row)} themeType="secondary">Delete</Button>
		</div>
	);
}

const getTableColumns = ({ onUpdate = () => {}, onDelete = () => {} }) => {
	const tableColumns = [
		{ Header: 'Name', accessor: (row) => row?.name || '-' },
		{ Header: 'Commodities', accessor: (row) => <CommodityFormat commodities={row?.commodities} /> },

		{ Header: 'Actions', accessor: (row) => <ActionFormat onUpdate={onUpdate} onDelete={onDelete} row={row} /> },
	];

	return tableColumns;
};

export default getTableColumns;
