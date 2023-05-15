import { Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function FilterContainer() {
	return (
		<div className={styles.container}>
			<Input
				size="sm"
				placeholder="Search By Id"
				prefix={<IcMSearchlight />}
				className={styles.input_box}
			/>
			<Button themeType="accent">Assign Plan</Button>
		</div>
	);
}

export default FilterContainer;
