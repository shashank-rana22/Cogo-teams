import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchLocations({
	searchVal = '', setSearchVal = () => {}, showInput = true, setShowInput = () => {}, setIsFocused = () => {},
}) {
	return (
		<div
			className={styles.container}
			style={{
				transition : 'width 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
				width      : showInput ? '300px' : '44px',
			}}
		>
			<Input
				type="search"
				suffix={(
					<IcMSearchlight
						className={styles.search_icon}
						onClick={() => setShowInput(true)}
					/>
				)}
				placeholder="Search for location"
				value={searchVal}
				onChange={(e) => {
					setSearchVal(e);
				}}
				onBlur={() => {
					setShowInput(false);
					setIsFocused(false);
				}}
				onFocus={() => setIsFocused(true)}
				autoFocus
				style={{ paddingRight: '5px' }}
			/>
		</div>
	);
}
export default SearchLocations;
