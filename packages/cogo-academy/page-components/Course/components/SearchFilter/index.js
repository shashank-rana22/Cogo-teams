import { Button, Input, ButtonIcon, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchFilter({ debounceQuery, input, setInput, setParams, params }) {
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
				value={input}
				placeholder="Search..."
				onChange={(value) => {
					setInput(value);
					debounceQuery(value);
					if (params.page !== 1) {
						setParams((prev) => ({ ...prev, page: 1 }));
					}
				}}
				className={styles.input}
			/>

			<Popover
				placement="bottom"
				render={() => (
					<div />
				)}
			>
				<Button
					type="button"
					themeType="secondary"
					size="md"
					onClick={() => {}}
					className={styles.filter_btn}
				>
					<IcMFilter style={{ marginRight: '2px' }} />
					Filter
					{false ? <div className={styles.filter_dot} /> : null}
				</Button>
			</Popover>

		</div>
	);
}

export default SearchFilter;
