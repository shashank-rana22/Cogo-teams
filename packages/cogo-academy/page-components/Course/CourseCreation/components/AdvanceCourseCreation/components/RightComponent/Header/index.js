import { Tags, Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import MAPPING from './MAPPING';
import styles from './styles.module.css';

function Header({ activeTab }) {
	const { title, text } = MAPPING[activeTab];

	return (
		<>
			<div className={styles.top_container}>
				<div className={styles.left_part}>
					<div className={styles.title}>Course Trial ABC</div>

					<Tags
						size="md"
						items={[{
							disabled : false,
							children : 'draft',
							color    : '#FEF199',
							tooltip  : false,
						}]}
					/>
				</div>

				<div className={styles.right_part}>
					<Button
						type="button"
						themeType="accent"
						className={styles.button}
					>
						Next
						{' '}
						<IcMArrowRight width={16} height={16} />
					</Button>
				</div>
			</div>

			<div className={styles.bottom_container}>
				<div className={styles.title}>{title}</div>
				<div className={styles.text}>{text}</div>
			</div>
		</>
	);
}

export default Header;
