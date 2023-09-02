import { Placeholder, Loader } from '@cogoport/components';
import { IcMArrowDown, IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import useGetCsvFile from '../../../../hooks/useGetCsvUrl';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function Card({ detail = {}, data = {}, activeCard = '', statsLoading = false, filter = {} }) {
	const { title = 'Previous Backlogs', color = '#000' } = detail;
	const { loading, data:csvData, getCsvFile } = useGetCsvFile(filter, activeCard);

	const handleDownload = () => {
		getCsvFile();
		window.open(csvData?.url);
	};

	return (
		<div>
			<div className={styles.row}>
				<div className={styles.heading}>{title}</div>
				{activeCard === detail?.status && ((loading) ? <Loader /> : <IcMDownload onClick={handleDownload} />) }
			</div>
			<div className={styles.hr_line} />
			<div className={styles.row}>
				<div style={{ color }} className={styles.number}>
					{statsLoading
						? <Placeholder style={{ width: '60px', height: '28px' }} />
						: (data[detail?.status] || DEFAULT_VALUE)}
				</div>
				{
					detail?.showViewMore
				&& (
					<div className={styles.link}>
						View all
						<IcMArrowDown />
					</div>
				)
				}
			</div>
		</div>
	);
}
export default Card;
