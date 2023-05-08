import { Button, Input, ButtonIcon } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchFilter() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Input
					size="md"
					suffix={(
						<ButtonIcon
							size="md"
							icon={<IcMSearchlight />}
							disabled={false}
							themeType="primary"
						/>
					)}
					value=""
					placeholder="Search for Course Name"
					onChange={() => {

					}}
					className={styles.input}
				/>
			</div>

			<div className={styles.filter_btn_container}>
				<Button
					type="button"
					themeType="secondary"
					size="sm"
					onClick={() => {}}
				>
					<IcMFilter style={{ marginLeft: '2px' }} />
					Filter
					{true ? <div className={styles.filter_dot} /> : null}
				</Button>
			</div>
		</div>
	);
}

export default SearchFilter;
