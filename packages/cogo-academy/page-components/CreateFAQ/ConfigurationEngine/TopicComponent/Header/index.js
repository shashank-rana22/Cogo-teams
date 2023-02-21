import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header({ setConfigurationPage = () => {} }) {
	const router = useRouter();

	const onClickAddTopic = () => {
		router.push(
			'/learning/faq/create/configuration?create=topic',
			'/learning/faq/create/configuration?create=topic',
		);
		setConfigurationPage('topic');
	};

	return (
		<div className={styles.container}>

			<div className={styles.buttonContainer}>
				<div className={styles.topic}>Topic</div>

				<div>
					<Button onClick={onClickAddTopic}>Add Topic</Button>
				</div>
			</div>

		</div>
	);
}

export default Header;
