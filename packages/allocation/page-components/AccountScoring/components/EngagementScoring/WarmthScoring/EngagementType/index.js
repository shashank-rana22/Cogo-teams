import { Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import FieldArray from '../../../../common/FieldArray';

import styles from './styles.module.css';

const columns = ['LIFECYCLE ITEM',
	'DIY SCORE & WARMTH DURATION',
	'ASSISTED SCORE & WARMTH DURATION',
	'SYSTEM SCORE & WARMTH DURATION', 'COGOVERSE SCORE & WARMTH DURATION'];

const tableColumns = [
	{
		Header   : 'LIFECYCLE ITEM',
		accessor : ({ lifecycle_item = '' }) => (
			<div className={styles.table_lifecycle_item}>{startCase(lifecycle_item)}</div>
		),
	},
	{
		Header   : 'DIY SCORE & WARMTH DURATION',
		accessor : ({ diy_score = '', diy_warmth_duration = '' }) => (
			<div>{(diy_score && diy_warmth_duration) ? `${diy_score} & ${diy_warmth_duration} days` : ''}</div>
		),
	},
	{
		Header   : 'ASSISTED SCORE & WARMTH DURATION',
		accessor : ({ assisted_score = '', assisted_warmth_duration = '' }) => (
			<div>
				{(assisted_score && assisted_warmth_duration)
					? `${assisted_score} & ${assisted_warmth_duration} days` : ''}

			</div>
		),
	},
	{
		Header   : 'SYSTEM SCORE & WARMTH DURATION',
		accessor : ({ system_score = '', system_warmth_duration = '' }) => (
			<div>
				{(system_score && system_warmth_duration)
					? `${system_score} & ${system_warmth_duration} days` : ''}

			</div>
		),
	},
	{
		Header   : 'COGOVERSE SCORE & WARMTH DURATION',
		accessor : ({ cogoverse_score = '', cogoverse_warmth_duration = '' }) => (
			<div>
				{(cogoverse_score && cogoverse_warmth_duration)
					? `${cogoverse_score} & ${cogoverse_warmth_duration} days` : ''}

			</div>
		),
	},
];

function EngagementType(props) {
	const { value, editMode, formProps } = props;

	const { engagement_type_details } = value;

	const { control, setValue } = formProps;

	useEffect(() => {
		setValue('single_item', engagement_type_details);
	}, [engagement_type_details, setValue]);

	return (
		<div className={styles.collapse_inner_container}>
			{editMode ? (
				<div className={styles.edit_container}>
					<div className={styles.table_header_container}>
						{columns.map((item) => (
							<div key={item} className={styles.table_headers}>
								{' '}
								{item}
							</div>

						))}
					</div>

					<hr color="#F8F2E7" />

					<div className={styles.sublist_item}>
						<FieldArray control={control} name="single_item" />
					</div>
				</div>
			) : <Table className={styles.table_container} columns={tableColumns} data={engagement_type_details} />}

		</div>
	);
}

export default EngagementType;
