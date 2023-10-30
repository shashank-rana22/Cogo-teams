import { Button } from '@cogoport/components';

import { REMARKS } from '../../../../Constants';

import styles from './styles.module.css';

function FillRemarksContents({ onChange = () => {} }) {
	return (
		<div>
			{(REMARKS || []).map(({ name, value }) => (
				<div key={name} className={styles.remark_action}>
					<Button
						themeType="secondary"
						onClick={() => onChange(value)}
					>
						{name}
					</Button>
				</div>
			))}
		</div>
	);
}

export default FillRemarksContents;
