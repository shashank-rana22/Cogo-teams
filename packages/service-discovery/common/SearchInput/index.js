import { Input } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchInput({
	value = '',
	onSearch = () => {},
	style = {},
	placeholder = '',
	size = 'md',
	onReset = () => {},
	showPrefix = false,
	...rest
}) {
	return (
		<section className={styles.container} style={style}>
			<Input
				{...rest}
				{...(showPrefix && {
					prefix: <IcMSearchlight
						className={styles.icon}
					/>,
				})}
				value={value}
				onChange={(val) => onSearch(val)}
				size={size}
				placeholder={placeholder}
				suffix={value ? (
					<IcMCross
						className={styles.icon}
						onClick={onReset}
					/>
				) : (
					<IcMSearchlight
						className={styles.icon}
					/>
				)}
			/>
		</section>
	);
}

export default SearchInput;
