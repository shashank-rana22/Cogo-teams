import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';
import useGetEngagementScoringAccountStats from '../../../../../hooks/useGetEngagementScoringAccountStats';

import styles from './styles.module.css';

const accounts = { // temporary data
	flame_hot : '200',
	hot       : '800',
	warm      : '900',
	cold      : '-',
	icy_cold  : '-',
};

function DistributionSettingsItem(props) {
	const {
		item = '', useGetControls = () => {},
		index = 0, inputStyle, control, errors,
		distributionList = [], watch,
	} = props;

	const { loading = false, setParams = () => {}, data } = useGetEngagementScoringAccountStats();

	const controls = useGetControls(item);

	const watchFields = watch();

	const valuesForPrefilling = [];

	(distributionList || []).forEach((element) => {
		const { id = '' } = element;

		const scores = {};

		Object.keys(watchFields).forEach((ele) => {
			const idx = ele.indexOf('_');

			if (ele.substring(0, idx) === id) {
				const attribute = ele.substring(idx + 1);

				scores[attribute] = watchFields[ele];
				scores.warmth = element.warmth;
			}
		});

		if (scores !== {}) {
			// if (!isEmpty(scores)) {
			valuesForPrefilling.push(scores);
		}
	});

	const limit = [];

	valuesForPrefilling.forEach((element) => {
		const obj = {};
		obj.warmth = element.warmth || undefined;
		obj.lower_limit = element.range_from || undefined;
		obj.upper_limit = element.range_to || undefined;

		limit.push(obj);
	});

	console.log(limit);

	// useEffect(() => {
	// 	if (!isEmpty(limit)) {
	// 		setParams(limit);
	// 	}
	// }, [limit]);

	return (
		<div className={styles.container}>
			<div className={styles.warmth_container}>
				{
								index === 0 && (
									<div className={styles.label}>
										WARMTH
									</div>
								)
							}

				<div className={styles.headers}>
					{startCase(item.warmth) || ''}
				</div>
			</div>

			<div className={styles.input_row}>
				{controls.map((element) => {
					const Element = getFieldController(element.type);

					return (
						<div className={styles?.[inputStyle] || styles.input}>
							{index === 0 && (
								<div className={styles.label}>
									{element.label}
								</div>
							)}

							<Element
								{...element}
								key={element.name}
								control={control}
							/>

							<div className={styles.error_message}>
								{errors?.[element.name]?.message}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.accounts_container}>
				{
								index === 0 && (
									<div className={styles.label}>
										NUMBER OF ACCOUNTS
									</div>
								)
							}

				<div className={styles.headers}>
					{accounts?.[item]}
				</div>
			</div>
		</div>
	);
}

export default DistributionSettingsItem;
