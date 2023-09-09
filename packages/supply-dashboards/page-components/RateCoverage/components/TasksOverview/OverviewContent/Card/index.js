import { Button, Placeholder } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

// import useGetCsvFile from '../../../../hooks/useGetCsvUrl';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function Card({
	detail = {},
	data = {},
	activeCard = '',
	statsLoading = false,
	className = '',
	handleClick = () => {},
}) {
	const { title = 'Previous Backlogs', color = '#000' } = detail;
	// const { loading, getCsvFile } = useGetCsvFile(filter, activeCard);

	// const handleDownload = async (e) => {
	// 	e.stopPropagation();
	// 	const url = await getCsvFile();				//for downloading csv file
	// 	if (url) {
	// 		window.open(url);
	// 	}
	// };

	return (
		<div className={styles[className]}>
			<div className={styles.row}>
				<div className={styles.heading}>{title}</div>
				{/* {activeCard === detail?.status
				&& ((loading) ? <Loader /> : <IcMDownload onClick={handleDownload} />)} */}
			</div>
			<div className={styles.hr_line} />
			<div className={styles.row}>
				<div style={{ color }} className={styles.number}>
					{statsLoading
						? <Placeholder className={styles.stats_loading} />
						: (data[detail?.status] || DEFAULT_VALUE)}
				</div>
				<span className={styles.link}>
					{activeCard !== detail?.status && (
						<Button themeType="linkUi" onClick={handleClick} type="button">
							View all
							{' '}
							<IcMArrowDown />
						</Button>
					)}

				</span>
			</div>
		</div>
	);
}
export default Card;
