import { Popover } from '@cogoport/components';

import styles from './styles.module.css';

function Content({ yearHandleChange = () => {}, visible = false, setVisible = () => {}, setYearHandle = () => {} }) {
	return (
		<Popover
			placement="right"
			caret={false}
			render={yearHandleChange()}
			className={styles.years_styles}
			visible={visible}
		>
			<>
				<div
					className={styles.data_styles}
					onClick={() => { setYearHandle(true); setVisible(true); }}
					role="presentation"
				>
					Calendar Year

				</div>
				<div className={styles.borders} />
				<div
					className={styles.data_styles}
					onClick={() => { setYearHandle(false); setVisible(true); }}
					role="presentation"
				>
					Financial Year

				</div>
			</>
		</Popover>
	);
}

export default Content;
