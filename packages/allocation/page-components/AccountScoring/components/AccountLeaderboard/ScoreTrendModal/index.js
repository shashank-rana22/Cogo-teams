import { DateRangepicker, Modal, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import ScoreTrendChart from '../../../common/ScoreTrendChart';
import getDurationOptions from '../../../configurations/duration-options';
import useGetEngagementScoringGraphStats from '../../../hooks/useGetEngagementScoringGraphStats';

import styles from './styles.module.css';

function ScoreTrendModal(props) {
	const { t } = useTranslation(['allocation']);

	const { scoreTrendIds, setScoreTrendIds } = props;

	const {
		data,
		duration,
		setDuration,
		dateRange,
		setDateRange,
	} = useGetEngagementScoringGraphStats({ scoreTrendIds });

	const { trend = '', data: graphData = [] } = data || {};

	const durationOptions = getDurationOptions({ t });

	return (
		<Modal
			size="fullscreen"
			show={!isEmpty(scoreTrendIds)}
			onClose={() => setScoreTrendIds({})}
			closeOnOuterClick
			showCloseIcon
			animate
			scroll={false}
		>
			<Modal.Header className={styles.header} title={t('allocation:score_trend_modal_heading')} />

			<Modal.Body>
				<div className={styles.filter_container}>
					<div className={styles.control_container}>
						<label className={styles.label}>{t('allocation:duration')}</label>

						<div className={styles.select_container}>
							<Select
								value={duration}
								onChange={setDuration}
								options={durationOptions}
								placeholder={t('allocation:select_duration')}
							/>
						</div>
					</div>

					<div className={styles.control_container}>
						<label className={styles.label}>{t('allocation:date_range')}</label>

						<DateRangepicker
							value={dateRange}
							onChange={setDateRange}
							isPreviousDaysAllowed
							maxDate={new Date()}
							disable={duration !== 'custom'}
						/>
					</div>
				</div>

				<div className={styles.score_graph}>
					<ScoreTrendChart trend={trend} data={graphData} source="modal" />
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ScoreTrendModal;
