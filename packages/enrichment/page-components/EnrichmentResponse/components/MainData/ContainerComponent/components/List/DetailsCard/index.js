import { startCase } from '@cogoport/utils';

import Workscopes from '../Workscopes';

import styles from './styles.module.css';

function DetailsCard({ response = {} }) {
	return (
		<div key={response} className={styles.content}>

			<div className={styles.box_info}>

				{Object.keys(response).map((responseKey) => (

					<div key={responseKey} className={styles.label_value_container}>
						<div className={styles.top}>
							{startCase(responseKey)}
						</div>

						<div className={styles.bottom}>
							{responseKey === 'work_scopes'
								? <Workscopes work_scopes={response?.[responseKey]} />
								: response?.[responseKey] }
						</div>
					</div>

				))}

			</div>

		</div>
	);
}

export default DetailsCard;
