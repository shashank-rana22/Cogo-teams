import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useEditExpertiseParameters from '../../../../../hooks/useEditExpertiseParameters';
import useGetExpertiseParameters from '../../../../../hooks/useGetExpertiseParameters';

import CardItem from './CardItem';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function ExpertiseParameters(props) {
	const { onClickAddCondition, activeCollapse = '' } = props;

	const [editMode, setEditMode] = useState(false);

	const { data, refetch, loading } = useGetExpertiseParameters({ activeCollapse });
	const { list = [] } = data || {};

	const {
		onSave,
		handleSubmit,
		control,
		loading: editLoading,
	} = useEditExpertiseParameters({ list, refetch, setEditMode });

	return (
		<div>
			<div className={styles.card_container}>

				{isEmpty(list) && !loading ? (
					<div className={styles.empty_card}>

						There are no conditions currently active,
						please add a score parameter to begin

						<Button
							themeType="secondary"
							onClick={onClickAddCondition}
							style={{ marginTop: '16px' }}
						>
							+ Condition

						</Button>

					</div>
				) : (
					<div className={styles.cards}>
						<div className={styles.button_container}>

							{editMode ? (
								<>
									<Button
										themeType="secondary"
										onClick={() => setEditMode(false)}
										disabled={editLoading}
									>
										Cancel

									</Button>
									<Button
										themeType="primary"
										type="submit"
										size="md"
										style={{ marginLeft: '8px' }}
										onClick={handleSubmit(onSave)}
										disabled={editLoading}
									>
										Save

									</Button>

								</>

							)
								: <Button themeType="secondary" onClick={() => setEditMode(!editMode)}>Edit</Button>}
						</div>

						{loading ? <LoadingState />
							: list.map((item) => <CardItem editMode={editMode} item={item} control={control} />) }

						<div className={styles.condition_button_container}>
							<Button themeType="secondary" onClick={onClickAddCondition}>+ Condition</Button>
						</div>

					</div>
				) }

			</div>

		</div>
	);
}

export default ExpertiseParameters;
