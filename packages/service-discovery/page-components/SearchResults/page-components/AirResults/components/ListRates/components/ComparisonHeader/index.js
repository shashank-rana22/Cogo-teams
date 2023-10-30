import { Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const ONE = 1;

function ComparisonHeader({
	comparisonRates = {},
	setComparisonRates = () => {},
	setScreen = () => {},
	isMobile = false,
}) {
	const selectedCards = Object.values(comparisonRates);

	const selectedCardsCount = selectedCards.length;

	const handleDeleteAll = () => setComparisonRates({});

	const handleDelete = (rate) => {
		const { id: idOfCardToBeDeleted = '' } = rate;

		setComparisonRates((prevRates) => {
			const { [idOfCardToBeDeleted]: _, ...updatedRates } = prevRates;
			return updatedRates;
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.content_container}>
				<div className={styles.count_container}>
					{isMobile ? (
						<IcMCross
							className={styles.close}
							onClick={handleDeleteAll}
						/>
					) : null}

					<div className={styles.count_heading}>
						{selectedCards.length}
						{' '}
						{selectedCardsCount === ONE ? 'Option' : 'Options'}
						{' '}
						selected
					</div>

					{selectedCardsCount === ONE ? (
						<div className={styles.add_more_text}>Add at least 1 more to Compare</div>
					) : null}
				</div>

				<div className={styles.pills_container}>
					{selectedCards.map((cardItem) => {
						const { airline = {} } = cardItem;

						const { short_name = '', id: airline_id = '' } = airline || {};

						return (
							<div key={`${airline_id}_${cardItem.id}`} className={styles.pill}>
								{short_name}

								<IcMCross
									className={styles.cross_icon}
									onClick={() => handleDelete(cardItem)}
								/>
							</div>
						);
					})}
				</div>
			</div>

			<div className={styles.buttons_container}>
				<Button
					type="button"
					size="md"
					themeType="link"
					onClick={handleDeleteAll}
					className={styles.unselect_button}
				>
					Unselect All
				</Button>

				<Button
					type="button"
					onClick={() => setScreen('comparison')}
					size="md"
					themeType="accent"
					disabled={selectedCardsCount === ONE}
					style={{ padding: '20px 16px' }}
				>
					View Comparison
				</Button>
			</div>
		</div>
	);
}

export default ComparisonHeader;
