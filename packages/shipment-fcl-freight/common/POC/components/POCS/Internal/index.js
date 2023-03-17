import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import getInternalPocData from '../../../helpers/getInternalPocData';

import Stakeholders from './Stakeholders';
import styles from './styles.module.css';

function Internal({ data = [] }) {
	const internalData = getInternalPocData(data);

	return (
		<div>

			<div className={styles.header}>
				<div className={styles.heading}>Internal : Cogoport</div>
				<div><Button size="sm">+ ADD POC</Button></div>
			</div>

			<div>
				{Object.keys(internalData).map((key) => (
					<div className={styles.service_container}>
						<div className={styles.service_name}>{startCase(key)}</div>
						<div><Stakeholders data={internalData[key]} /></div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Internal;
