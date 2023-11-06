import { Button, Loader, Placeholder, Popover, cl } from '@cogoport/components';
import { IcMArrowDown, IcMDownload } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { DEFAULT_VALUE, VALUE_ONE } from '../../../../configurations/helpers/constants';
import useGetCsvFile from '../../../../hooks/useGetCsvUrl';

import styles from './styles.module.css';

function Card({
	detail = {},
	data = {},
	activeCard = '',
	statsLoading = false,
	className = '',
	handleClick = () => {},
	filter = {},
	card_detail = '',
}) {
	const { title = 'Previous Backlogs', color = '#000' } = detail;

	const [visible, setVisible] = useState(false);

	const { loading, urlList, getCsvFile } = useGetCsvFile(filter, activeCard);

	const isStartDatePresent = filter?.start_date || filter?.end_date;
	let updatedTitle = title;
	if (card_detail === 'completed' && isStartDatePresent) {
		updatedTitle = 'Completed';
	} else if (card_detail === 'pending' && isStartDatePresent) {
		updatedTitle = 'Pending';
	}

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
					<Button className={styles.url_link} themeType="linkUi" onClick={() => { window.open(url); }}>
						{`${startCase(activeCard)} ${index + VALUE_ONE}`}
					</Button>
				</div>
			))
		);
	}

	return (
		<div
			role="button"
			tabIndex={0}
			className={cl`${styles.card_main_container} ${styles[className]}`}
			onClick={handleClick}
		>
			<div className={styles.row}>
				<div className={styles.heading}>{updatedTitle}</div>
				{(activeCard === detail?.status && activeCard !== 'weekly_backlog_count')
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
						<Button themeType="linkUi" type="button">
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
