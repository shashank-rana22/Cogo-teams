import { Placeholder, Loader } from '@cogoport/components';
import { IcMArrowDown, IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import useGetCsvFile from '../../../../hooks/useGetCsvUrl';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function Card({ detail = {}, data = {}, activeCard = '', statsLoading = false, filter = {} }) {
	const { title = 'Previous Backlogs', color = '#000' } = detail;
	const { loading, getCsvFile } = useGetCsvFile(filter, activeCard);

	const handleDownload = async (e) => {
		e.stopPropagation();
		const url = await getCsvFile();
		if (url) {
			window.open(url);
		}
	};

	return (
		<>
			<div className={styles.row}>
				<div className={styles.heading}>{title}</div>
				{activeCard === detail?.status
				&& ((loading) ? <Loader /> : <IcMDownload onClick={handleDownload} />)}
			</div>
			<div className={styles.hr_line} />
			<div className={styles.row}>
				<div style={{ color }} className={styles.number}>
					{statsLoading
						? <Placeholder style={{ width: '60px', height: '28px' }} />
						: (data[detail?.status] || DEFAULT_VALUE)}
				</div>
				<span className={styles.link}>
					{activeCard !== detail?.status && (
						<span>
							View all
							{' '}
							<IcMArrowDown />
						</span>
					)}

				</span>
			</div>
		</>
	);
}
export default Card;
