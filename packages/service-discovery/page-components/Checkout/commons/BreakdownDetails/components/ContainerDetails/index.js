import { Pill } from '@cogoport/components';

import getDetails from '../../../../../../common/ContainerDetails/getDetails';

import styles from './styles.module.css';

function ContainerDetails({ details = {}, primary_service = '' }) {
	const containerDetails = getDetails({ item: details, primary_service });

	return (
		<div className={styles.container}>
			{containerDetails.map((item) => (
				<Pill
					key={item}
					size="md"
					style={{ border: '1px solid #24C7D9' }}
				>
					{item}
				</Pill>
			))}
		</div>
	);
}

export default ContainerDetails;
