import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetSortingData({
	exceptionFilter,
	setExceptionFilter,
	setOrderBy, sortStyleDesc,
	sortStyleAsc, type,
}) {
	return (
		<div
			role="presentation"
			className={styles.icon_div}
			onClick={() => {
				setOrderBy((prev) => ({
					sortType : prev?.sortType === 'ASC' ? 'DESC' : 'ASC',
					sortBy   : type,
				}));
				setExceptionFilter({ ...exceptionFilter, page: 1 });
			}}
		>

			<IcMArrowRotateUp style={{ color: sortStyleAsc }} />

			<IcMArrowRotateDown style={{ color: sortStyleDesc }} />
		</div>
	);
} export default GetSortingData;
