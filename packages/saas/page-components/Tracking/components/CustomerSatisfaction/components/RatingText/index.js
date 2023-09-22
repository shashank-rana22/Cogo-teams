import { Chips, Textarea } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { feedbackMapping } from '../../constants/feedback-options';
import { getFeedbackTitleMapping } from '../../constants/feedback-title-mapping';

import styles from './styles.module.css';

const DEFAULT_RATING = 3;

function RatingText({ setFeedback = () => {}, feedback = {} }) {
	const { rating = DEFAULT_RATING, selectedOptions = [], reason = '' } = feedback || {};

	const { t } = useTranslation(['common']);

	const FEEDBACK_TITLE_MAPPING = getFeedbackTitleMapping({ t });

	const options = feedbackMapping[rating] || [];
	return (
		<div className={styles.container}>

			<div className={styles.title}>
				{FEEDBACK_TITLE_MAPPING[rating]}
			</div>

			<div className={styles.chips}>
				<Chips
					items={options}
					selectedItems={selectedOptions}
					enableMultiSelect
					onItemChange={(e) => {
						setFeedback((prev) => ({
							...prev,
							selectedOptions: e,
						}));
					}}
				/>
			</div>

			<div>
				<Textarea
					rows={4}
					value={reason}
					placeholder={t('common:csat_text_area_placeholder')}
					onChange={(e) => setFeedback((prev) => ({
						...prev,
						reason: e,
					}))}
				/>
			</div>
		</div>
	);
}

export default RatingText;
