import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface Props {
	sort?:object;
	setSort?: React.Dispatch<React.SetStateAction<object>>;
	headerName?:string;
}
function GetSortingData({ sort, setSort, headerName }:Props) {
	const SORTING_KEY = Object.values(sort);

	return (
		<div className={styles.sorting}>
			<div style={{ marginRight: '8px' }}>{headerName}</div>
			<div style={{ marginBottom: '2px' }}>
				<div
					role="presentation"
					className={SORTING_KEY?.[0] === 'Asc' ? styles.sort_active : styles.sort_inactive}
					onClick={() => {
						setSort({ [headerName]: 'Asc' });
					}}
				>
					<IcMArrowRotateUp />
				</div>
				<div
					role="presentation"
					className={SORTING_KEY?.[0] === 'Desc' ? styles.sort_active : styles.sort_inactive}
					onClick={() => {
						setSort({ [headerName]: 'Desc' });
					}}
				>
					<IcMArrowRotateDown />
				</div>

			</div>
		</div>
	);
}
export default GetSortingData;
