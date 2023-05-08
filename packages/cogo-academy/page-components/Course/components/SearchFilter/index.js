import { Button, Input, ButtonIcon } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchFilter() {
	return (
		<div className={styles.container}>
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
			<Button
				type="button"
				themeType="secondary"
				size="md"
				onClick={() => {}}
				className={styles.filter_btn}
			>
				<IcMFilter style={{ marginRight: '2px' }} />
				Filter
				{true ? <div className={styles.filter_dot} /> : null}
			</Button>

		</div>
	);
}

export default SearchFilter;
