import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const renderName = (name, source = '') => {
	if (source === 'cogo_assured_rate') {
		return 'COGO ASSURED';
	}
	return name;
};

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
			const { [idOfCardToBeDeleted]: _, ...restRates } = prevRates;

			return restRates;
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
						{selectedCardsCount === GLOBAL_CONSTANTS.one ? 'Option' : 'Options'}
						{' '}
						selected
					</div>

					{selectedCardsCount === GLOBAL_CONSTANTS.one ? (
						<div className={styles.add_more_text}>Add at least 1 more to Compare</div>
					) : null}
				</div>

				<div className={styles.pills_container}>
					{selectedCards.map((cardItem) => {
						const { shipping_line, airline, source = '' } = cardItem;

						const line = isEmpty(shipping_line) ? airline : shipping_line || {};

						const { short_name = '', id: line_id = '' } = line || {};

						return (
							<div key={`${line_id}_${cardItem.id}`} className={styles.pill}>
								{renderName(short_name, source)}

								{source !== 'cogo_assured_rate' ? (
									<IcMCross
										className={styles.cross_icon}
										onClick={() => handleDelete(cardItem)}
									/>
								) : null }
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
					disabled={selectedCardsCount === GLOBAL_CONSTANTS.one}
					style={{ padding: '20px 16px' }}
				>
					View Comparison
				</Button>
			</div>
		</div>
	);
}

export default ComparisonHeader;
