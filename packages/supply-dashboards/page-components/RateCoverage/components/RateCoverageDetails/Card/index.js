import { ButtonGroup } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function Card({ value, type, setIndex }) {
	const backgroundImgs = [{
		backgroundImage:
		'url(https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/rate-coverage-full-card1.png)',
	},
	{
		backgroundImage:
		'url(https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/rate-coverage-full-card2.png)',
	}, {
		backgroundImage:
		'url(https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/rate-coverage-full-card3)',
	}];

	const backgroundColorOnHover = [
		{ backgroundColor: '#F2F3FA' },
		{ backgroundColor: '#FDEBE9' },
		{ backgroundColor: '#E0E0E0' },
	];

	const options = [
		{
			children: (
				<div className={styles.view_details_btn}>
					<div>View Details</div>
					<IcMArrowRight />
				</div>
			),
			onClick: () => {
				setIndex(type);
			},
		},
	];

	const colors = ['#7278AD', '#828282', '#F37166', '#7278AD'];
	const title = ['Avg. Rate density as per today', 'Missing Rates as per today', 'Expiring Rates', 'Dislike Rates'];
	const downloadTitle = ['Rate Density', 'Missing Rates', 'Expiring Rates', 'Dislike Rates'];

	return (
		<div>
			<div className={styles.card_on_hover}>
				<div className={styles.card_on_hover_heading} style={backgroundColorOnHover[type]}>
					<span className={styles.bold_text}>
						{`${downloadTitle[type]}: `}
					</span>
					Lorem Ipsum Lorem Ipsum Lorem Ipsum eew
					Lorem  Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lo
				</div>
				<ButtonGroup
					size="md"
					options={options}
					disabled={false}
					className={styles.view_details_btn}
				/>
			</div>
			<div className={styles.card} style={backgroundImgs[type]}>
				<div className={styles.title}>{title[type]}</div>
				<div className={styles.value} style={{ color: colors[type] }}>{ !isNaN(value) ? value : 0}</div>
			</div>
			<div className={styles.download_link}>
				Download
				{' '}
				{downloadTitle[type]}
				{' '}
				Results
			</div>

		</div>
	);
}

export default Card;
