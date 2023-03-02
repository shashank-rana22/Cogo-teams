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
					<Button onClick={() => setEditMode(!editMode)}>Edit</Button>
				</div>

				{req[name].map((item) => <CardItem editMode={editMode} item={item} />)}
			</div>
		</div>
	);
}

export default EditExpertiseParamsCard;
