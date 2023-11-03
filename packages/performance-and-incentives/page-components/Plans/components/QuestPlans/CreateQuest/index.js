import { IcMArrowBack } from '@cogoport/icons-react';

import MODE_KEYS_MAPPING from '../configurations/active-mode-key-mapping';

import styles from './styles.module.css';

const { LIST } = MODE_KEYS_MAPPING;

function CreateQuests({ setMode = () => {} }) {
	return (
		<div>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setMode(LIST)}
				/>

				<div className={styles.title}>Create Quest</div>
			</div>
		</div>
	);
}

export default CreateQuests;
