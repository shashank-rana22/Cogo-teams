import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const renderName = (name) => {
	if (name.includes('COGO')) return 'COGO ASSURED';
	return name;
};

function ComparisonHeader({
	comparisonRates = {},
	setComparisonRates = () => {},
	setScreen = () => {},
}) {
	const selectedCards = Object.values(comparisonRates);

	const handleDelete = () => setComparisonRates({});

	return (
		<div className={styles.container}>
			<div className={styles.content_container}>
				<div className={styles.count_heading}>
					{selectedCards.length}
					{' '}
					Options selected
				</div>

				<div className={styles.pills_container}>
					{selectedCards.map((cardItem) => {
						const { shipping_line = {} } = cardItem;
						const { short_name = '', id: shipping_line_id = '' } = shipping_line || {};

						return (
							<div key={shipping_line_id} className={styles.pill}>
								{renderName(short_name)}
							</div>
						);
					})}
				</div>

				<Button
					type="button"
					size="md"
					themeType="link"
					onClick={handleDelete}
					className={styles.unselect_button}
				>
					Unselect All
				</Button>
			</div>

			<div className={styles.buttons_container}>
				{/* <Button
					onClick={() => {

					}}
					type="button"
					size="md"
					themeType="secondary"
					className={styles.button}
					style={{ padding: '20px 16px' }}
				>
					Share Quotation
				</Button> */}

				<Button
					type="button"
					onClick={() => setScreen('comparison')}
					size="md"
					themeType="accent"
					style={{ padding: '20px 16px' }}
				>
					View Comparison
				</Button>
			</div>
		</div>
	);
}

export default ComparisonHeader;
