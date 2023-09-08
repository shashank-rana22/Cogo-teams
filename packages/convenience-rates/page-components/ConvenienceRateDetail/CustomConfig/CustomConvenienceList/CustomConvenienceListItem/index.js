import { cl, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const LAST_INDEX = 1;

const columnsMapping = [
	{
		key      : 'updated_at',
		label    : 'Last updated on',
		getValue : (data) => formatDate({
			date       : data?.updated_at,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
		span: 3.5,
	},
	{
		key      : 'last_updated_by',
		label    : 'Last updated by',
		getValue : (data) => data?.last_updated_by || '___',
		span     : 3.5,
	},
	{
		key      : 'status',
		label    : 'Status',
		getValue : (data) => startCase(data?.status),
		span     : 3.5,
	},
];
function Content({ columnDetails = {}, data = {} }) {
	const { label, getValue } = columnDetails;

	const value = getValue(data);

	return (
	// isLastItem is not taken care of
		<div className={`${styles.content_container}`}>
			{label ? <div className={styles.content_title}>{label}</div> : null}
			<div className={cl`${styles.content_value} ${value}`}>{value}</div>
		</div>
	);
}
const columnsWithValue = ({ data, list }) => {
	const NEW_MAPPING_LIST = [];
	list.forEach((columnDetails) => {
		const { getValue } = columnDetails;

		const value = getValue(data);

		NEW_MAPPING_LIST.push({
			...columnDetails,
			value,
		});
	});

	return NEW_MAPPING_LIST;
};

function CustomConvenienceListItem({ data = {} }) {
	const columnsList = columnsWithValue({ data, list: columnsMapping });

	return (
	// <div>CustomConvenienceListItem</div>
		<div className={styles.container}>
			<div className={styles.tags_list}>
				{(data?.organization_data || []).map((item) => (
					<div key={item.updated_by} style={{ display: 'flex', marginRight: '8px' }}>
						<Pill>{item.organization_name}</Pill>
					</div>
				))}
			</div>
			<div className={styles.grid_row}>
				{columnsList.map((columnDetails, index) => {
					const { key } = columnDetails;
					return (
						<div key={key}>
							<Content
								key={key}
								data={data}
								columnDetails={columnDetails}
								isLastItem={index === columnsList.length - LAST_INDEX}
							/>
						</div>
					);
				})}
			</div>
			<IcMEdit />

		</div>
	);
}

export default CustomConvenienceListItem;
