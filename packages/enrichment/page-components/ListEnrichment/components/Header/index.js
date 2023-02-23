import { Button } from '@cogoport/components';
import { IcMDownload, IcMUpload } from '@cogoport/icons-react';

import Filters from '../Filters';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>

			<Filters />

			<div className={styles.actions}>

				<Button
					size="lg"
					themeType="secondary"
					style={{ marginRight: '8px' }}
				>
					<IcMDownload width={16} height={16} style={{ marginRight: '10px' }} />
					Download

				</Button>
				<Button
					size="lg"
					themeType="primary"
				>

					<IcMUpload width={16} height={16} style={{ marginRight: '10px' }} />
					Upload

				</Button>

			</div>
		</div>

	);
}

export default Header;
