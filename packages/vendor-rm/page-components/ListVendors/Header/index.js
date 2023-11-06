import { Placeholder, Select } from '@cogoport/components';

import styles from './styles.module.css';

const ENTITY_CODE_LENGTH = 1;

function Header({
	activeEntity = '',
	setActiveEntity = () => {},
	entityOptions = [],
	entityDataCount = 0,
	entityLoading = false,
}) {
	return (
		<div className={styles.flex}>
			<div className={styles.header_text}>
				Vendor Relationship Management
			</div>
			{entityLoading ? <Placeholder className={styles.loader} /> : (
				<Select
					name="activeEntity"
					value={activeEntity}
					onChange={(entityVal) => setActiveEntity(entityVal)}
					placeholder="Select Entity"
					options={entityOptions}
					size="sm"
					style={{ width: '284px', height: '28px' }}
					disabled={entityDataCount <= ENTITY_CODE_LENGTH}
				/>
			)}
		</div>
	);
}

export default Header;
