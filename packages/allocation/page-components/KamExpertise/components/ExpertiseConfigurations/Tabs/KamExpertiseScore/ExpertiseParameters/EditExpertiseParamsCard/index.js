import { Button } from '@cogoport/components';

import CardItem from './CardItem';
import styles from './styles.module.css';

function EditExpertiseParamsCard({ expertiseData, dummyData = [], editMode = false, setEditMode = () => {} }) {
	const { name = '' } = expertiseData;

	const req = dummyData.find((element) => name in element);

	return (
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
	);
}

export default EditExpertiseParamsCard;
