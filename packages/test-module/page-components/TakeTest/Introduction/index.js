import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

const CONTENT_MAPPING = {
	topics_covered: {
		title : 'Topics Covered',
		value : 'Enrichment, Shipments',
		icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/document-svg.svg',
	},
	number_of_questions: {
		title : 'No. of questions',
		value : '25',

	},
	duration: {
		title : 'Duration',
		value : '01:00 hr',
		icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg',
	},
};

function Introduction({ setActiveState }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Shipment and Enrichment Test
			</div>

			<div className={styles.content}>
				{Object.values(CONTENT_MAPPING).map((content) => {
					const { icon, title, value } = content;

					return (
						<div className={styles.content_container}>
							{icon ? <img style={{ width: 18, height: 21, marginRight: 12 }} src={icon} alt="" /> : null}

							<div className={styles.content_text}>
								<div className={styles.label}>{title}</div>

								<div className={styles.value}>{value}</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.button_container}>
				<Button type="button" onClick={() => setActiveState('ongoing')}>
					Start your test
					{' '}
					<IcMArrowRight />
				</Button>
			</div>
		</div>
	);
}

export default Introduction;
