import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const onClickBackIcon = () => {
		router.back();
	};

	return (
		<div className={styles.container}>
			<div className={styles.back_arrow} role="presentation" onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />
			</div>

			<div className={styles.configuration_text}>
				Configuration Engine
			</div>
		</div>

	);
}

export default Header;
