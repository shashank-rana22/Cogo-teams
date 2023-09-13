import { Button, Loader, Placeholder, Popover } from '@cogoport/components';
import { IcMArrowDown, IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetCsvFile from '../../../../hooks/useGetCsvUrl';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const VALUE_ONE = 1;

function Card({
	detail = {},
	data = {},
	activeCard = '',
	statsLoading = false,
	className = '',
	handleClick = () => {},
	filter = {},
}) {
	const { title = 'Previous Backlogs', color = '#000' } = detail;

	const [visible, setVisible] = useState(false);

	const { loading, urlList, getCsvFile } = useGetCsvFile(filter, activeCard);

	const handleDownload = async (e) => {
		e.stopPropagation();
		setVisible(!visible);
		getCsvFile();
	};

	function RenderContent() {
		if (loading) { return <Loader />; }
		if (!loading && isEmpty(urlList)) { return <>No data</>; }
		return (
			(urlList || []).map((url, index) => (
				<div key={url}>
					<Button themeType="linkUi" onClick={() => { window.open(url); }}>
						link
						{index + VALUE_ONE}
					</Button>
				</div>
			))
		);
	}

	return (
		<div className={styles[className]}>
			<div className={styles.row}>
				<div className={styles.heading}>{title}</div>
				{activeCard === detail?.status
				&&					(
					<Popover placement="top" render={<div className={styles.url_container}><RenderContent /></div>}>
						<IcMDownload onClick={handleDownload} />
					</Popover>
				)}
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
