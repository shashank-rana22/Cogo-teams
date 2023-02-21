import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header({ setConfigurationPage = () => {} }) {
	const router = useRouter();

	const onClickAddTag = () => {
		router.push(
			'/learning/faq/create/configuration?create=tag',
			'/learning/faq/create/configuration?create=tag',
		);
		setConfigurationPage('tag');
	};

	return (
		<div className={styles.container}>

			<div className={styles.buttonContainer}>
				<div className={styles.tag}>Tag</div>

				<div>
					<Button onClick={onClickAddTag}>Add Tag</Button>
				</div>
			</div>

		</div>
	);
}

export default Header;
