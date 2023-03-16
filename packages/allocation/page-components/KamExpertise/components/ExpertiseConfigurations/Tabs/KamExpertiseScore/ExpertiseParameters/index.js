import { Button } from '@cogoport/components';
import React, { useState } from 'react';
import useEditExpertiseParameters from '../../../../../hooks/useEditExpertiseParameters';

import useGetExpertiseParameters from '../../../../../hooks/useGetExpertiseParameters';

import CardItem from './CardItem';
import styles from './styles.module.css';

function ExpertiseParameters(props) {
	const { onClickAddCondition, activeCollapse = '' } = props;

	const [editMode, setEditMode] = useState(false);

	const { data } = useGetExpertiseParameters({ activeCollapse });
	const { list = [] } = data || {};

	const { onSave, handleSubmit, control } = useEditExpertiseParameters(list);

	return (
		<div>
			<div className={styles.card_container}>
				<div className={styles.cards}>
					<div className={styles.button_container}>

						{editMode ? (
							<>
								<Button themeType="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
								<Button
									themeType="primary"
									type="submit"
									size="md"
									style={{ marginLeft: '8px' }}
									onClick={handleSubmit(onSave)}
								>
									Save

								</Button>

							</>

						)
							: <Button themeType="secondary" onClick={() => setEditMode(!editMode)}>Edit</Button>}
					</div>

					{list.map((item) => <CardItem editMode={editMode} item={item} control={control}/>)}
				</div>
			</div>

			<Button themeType="secondary" onClick={onClickAddCondition}>+ Condition</Button>
		</div>
	);
}

export default ExpertiseParameters;
