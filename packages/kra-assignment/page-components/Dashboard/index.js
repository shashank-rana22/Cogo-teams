import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.modules.css';

const REDIRECT_URL = '/kra-assignment/create';

function Dashboard() {
	const router = useRouter();

	const onClickConfiguration = () => {
		router.push(REDIRECT_URL, REDIRECT_URL);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			Dashboard
			<div className={styles.button_container}>
				<Button onClick={onClickConfiguration}>ADD KRA</Button>
			</div>
		</div>
	);
}

export default Dashboard;
