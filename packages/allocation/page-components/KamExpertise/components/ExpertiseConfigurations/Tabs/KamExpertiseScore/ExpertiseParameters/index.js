import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import CardItem from './CardItem';
import dummyData from './dummyData';
import styles from './styles.module.css';

function ExpertiseParameters(props) {
	const { onClickAddCondition, name } = props;

	const [editMode, setEditMode] = useState(false);

	// const { name = '' } = expertiseData;

	const req = dummyData.find((element) => name in element);

	return (
		<div>

			<div className={styles.card_container}>
				<div className={styles.cards}>
					<div className={styles.button_container}>

						{editMode ? (
							<>
								<Button themeType="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
								<Button style={{ marginLeft: '8px' }}>Save</Button>

							</>

						)
							: <Button themeType="secondary" onClick={() => setEditMode(!editMode)}>Edit</Button>}
					</div>

					{req[name].map((item) => <CardItem editMode={editMode} item={item} />)}
				</div>
			</div>

			<Button themeType="secondary" onClick={onClickAddCondition}>+ Condition</Button>
		</div>
	);
}

export default ExpertiseParameters;
