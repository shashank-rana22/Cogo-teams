import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetSortingData({
	exceptionFilter,
	setExceptionFilter,
	setOrderBy, sortStyleDesc,
	sortStyleAsc, type,
}) {
	return (
		<div className={styles.icon_div}>
			<IcMArrowRotateUp
				style={{ color: sortStyleAsc }}
				onClick={() => {
					setOrderBy({
						sortType : 'ASC',
						sortBy   : type,
					});
					setExceptionFilter({ ...exceptionFilter, page: 1 });
				}}
			/>

			<IcMArrowRotateDown
				style={{ color: sortStyleDesc }}
				onClick={() => {
					setOrderBy({
						sortType : 'DESC',
						sortBy   : type,
					});
					setExceptionFilter({ ...exceptionFilter, page: 1 });
				}}
			/>
		</div>
	);
} export default GetSortingData;
