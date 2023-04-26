import { Table, Button, Popover } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import FieldArray from '../../../../common/FieldArray';
import useEditEngagementScoringConfiguration from '../../../../hooks/useEditEngagementScoringConfiguration';

import styles from './styles.module.css';

const columns = ['LIFECYCLE ITEM',
	'DIY SCORE & WARMTH DURATION',
	'ASSISTED SCORE & WARMTH DURATION',
	'SYSTEM SCORE & WARMTH DURATION', 'COGOVERSE SCORE & WARMTH DURATION'];

const tableColumns = [
	{
		Header   : 'LIFECYCLE ITEM',
		accessor : ({ event_name = '' }) => (
			<Popover placement="right" trigger="mouseenter" render={startCase(event_name)}>
				<div className={styles.table_lifecycle_item}>{startCase(event_name)}</div>
			</Popover>

		),
	},
	{
		Header   : 'DIY SCORE & WARMTH DURATION',
		accessor : ({ diy_score = '', diy_warmth_duration = '' }) => (
			<div>{(diy_score && diy_warmth_duration) ? `${diy_score} & ${diy_warmth_duration} days` : '-'}</div>
		),
	},
	{
		Header   : 'ASSISTED SCORE & WARMTH DURATION',
		accessor : ({ assisted_score = '', assisted_warmth_duration = '' }) => (
			<div>
				{(assisted_score && assisted_warmth_duration)
					? `${assisted_score} & ${assisted_warmth_duration} days` : '-'}

			</div>
		),
	},
	{
		Header   : 'SYSTEM SCORE & WARMTH DURATION',
		accessor : ({ system_score = '', system_warmth_duration = '' }) => (
			<div>
				{(system_score && system_warmth_duration)
					? `${system_score} & ${system_warmth_duration} days` : '-'}

			</div>
		),
	},
	{
		Header   : 'COGOVERSE SCORE & WARMTH DURATION',
		accessor : ({ cogoverse_score = '', cogoverse_warmth_duration = '' }) => (
			<div>
				{(cogoverse_score && cogoverse_warmth_duration)
					? `${cogoverse_score} & ${cogoverse_warmth_duration} days` : '-'}

			</div>
		),
	},
];

function EngagementType(props) {
	const { value, editMode, setEditMode = () => {}, formProps, refetch } = props;

	const { engagement_type_details, engagement_type } = value;

	const { control, setValue, watch, handleSubmit } = formProps;

	const { onSave, editLoading } = useEditEngagementScoringConfiguration({ refetch, setEditMode });

	const handleSave = (formValues) => {
		onSave(formValues, engagement_type);
	};

	useEffect(() => {
		setValue('single_item', engagement_type_details);
	}, [engagement_type_details, setValue]);

	return (
		<div className={styles.collapse_inner_container}>
			<div className={styles.buttons_container}>
				{editMode === engagement_type ? (
					<>
						<Button
							size="md"
							themeType="secondary"
							style={{ marginLeft: '16px' }}
							onClick={() => setEditMode('')}
							disabled={editLoading}
						>
							Cancel

						</Button>

						<Button
							size="md"
							themeType="primary"
							style={{ marginLeft: '16px' }}
							onClick={handleSubmit(handleSave)}
							loading={editLoading}
						>
							Save
						</Button>
					</>

				) : (
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setEditMode(engagement_type)}
						style={{ marginLeft: '16px' }}
					>
						<IcMEdit style={{ marginRight: '8px' }} />

						Edit
					</Button>
				)}
			</div>

			{editMode ? (
				<div>
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
							<FieldArray
								control={control}
								name="single_item"
								watch={watch}
								engagementType={engagement_type}
								refetch={refetch}
								editLoading={editLoading}
							/>
						</div>
					</div>
				</div>

			) : <Table className={styles.table_container} columns={tableColumns} data={engagement_type_details} />}

		</div>
	);
}

export default EngagementType;
