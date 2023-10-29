import { cl, Pill, Button } from '@cogoport/components';
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

function CustomHandlingFeeListItem({
	data = {}, setShowCustomConfigForm = () => { }, setOrganizationDetails = () => { },
	setSelectedCustomConfig = () => { },
}) {
	const columnsList = columnsWithValue({ data, list: columnsMapping });

	return (
		<div className={styles.container}>
			<div className={styles.tags_list}>
				{(data?.organization_data || []).map((item) => (
					<div key={item.updated_by} className={styles.tags_row}>
						<Pill size="md" color="green">{item.organization_name}</Pill>
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
				<Button
					style={{ marginRight: '200px' }}
					themeType="teritiary"
					onClick={() => {
						setShowCustomConfigForm(true);
						setSelectedCustomConfig(data);
						setOrganizationDetails({
							organization_type : data?.organization_type || '',
							cogo_entity_id    : data?.cogo_entity_id || '',
							organization_name : data?.organization_data || {},
						});
					}}
				>
					<IcMEdit />
				</Button>
			</div>

		</div>
	);
}

export default CustomHandlingFeeListItem;
