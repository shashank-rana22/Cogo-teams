import { IcMArrowRotateLeft, IcMArrowRotateRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

const MIN_PAGE_NUMBER = 0;
const ONE = 1;
function PageNumber({ page, setPage, totalCount, totalPages, pageLimit }) {
	const setPageNumber = (pageNumber) => {
		// console.log("clicked", pageNumber);
		if (pageNumber > MIN_PAGE_NUMBER && pageNumber <= totalPages) {
			setPage(pageNumber);
		}
	};
	return (
		<div className={styles.page}>
			<span>
				{`Showing Results ${Math.min(
					(page - ONE) * pageLimit + ONE,
					totalCount,
				)} - ${Math.min(
					page * pageLimit,
					totalCount,
				)} out of ${totalCount}`}
			</span>
			<IcMArrowRotateLeft onClick={() => setPageNumber(page - ONE)} />
			<IcMArrowRotateRight onClick={() => setPageNumber(page + ONE)} />
		</div>
	);
}
export default PageNumber;
