import { Table, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useEffect } from 'react';

import tableColumns from '../../../../constants/get-configuration-columns';
import editHeaders from '../../../../constants/get-edit-headers';
import useEditEngagementScoringConfiguration from '../../../../hooks/useEditEngagementScoringConfiguration';
import FieldArray from '../FieldArray';

import styles from './styles.module.css';

function EngagementType(props) {
	const { item, editMode, setEditMode = () => {}, formProps, refetch } = props;

	const { engagement_type_details = [], engagement_type = '' } = item;

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
							type="submit"
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
							{editHeaders.map((header) => (
								<div key={header} className={styles.table_headers}>
									{' '}
									{header}
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
