import { Button } from '@cogoport/components';
import { IcMDownload, IcMUpload } from '@cogoport/icons-react';

import Filters from './Filters';
import styles from './styles.module.css';

function Header() {
	return (
		<div>
			<h1>
				Ingestion
			</h1>
			<div className={styles.button_section}>

				<Button
					size="lg"
					themeType="secondary"
					style={{ marginRight: '16px' }}
				>
					<IcMDownload style={{ marginRight: '4px' }} />
					Download Template
				</Button>

				<Button
					size="lg"
					themeType="primary"
				>
					<IcMUpload style={{ marginRight: '4px' }} />
					Upload

				</Button>
			</div>

			<Filters />
		</div>

	);
}

export default Header;
