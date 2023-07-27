import { Accordion, Pill } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

const OVERALL_RISK_COLOUR_MAPPING = {
	very_severe: {
		background : '#ff0000',
		color      : '#ffffff',
	},
	severe: {
		background : '#F7CDCD',
		color      : '#121212',
	},
	high: {
		background : '#FCEDBF',
		color      : '#121212',
	},
	medium: {
		background : '#D9EAFD',
		color      : '#121212',
	},
};

function OverallRisk({ detail = {}, setIsVeryRisky = () => {} }) {
	const {
		importer_exporter = {},
		credit_details: { is_any_invoice_on_credit = false },
	} = detail || {};

	const [{ data }] = useRequest(
		{
			method : 'get',
			url    : '/get_organization_credit_severity',
			params : {
				organization_id: importer_exporter?.id,
			},
		},
		{ manual: false },
	);

	const { overall_credit_risk = 'very_severe', message = '' } = data || {};

	useEffect(() => {
		setIsVeryRisky(
			() => !!(overall_credit_risk === 'very_severe' && is_any_invoice_on_credit),
		);
	}, [overall_credit_risk, is_any_invoice_on_credit, setIsVeryRisky]);

	const { background, color } = OVERALL_RISK_COLOUR_MAPPING[overall_credit_risk];

	return (
		<div className={styles.container}>
			<Accordion
				type="form"
				animate
				isOpen
				title={(
					<div className={styles.header}>
						<div className={styles.flex}>
							<div className={styles.flex}>
								Overall Credit Risk :
								{overall_credit_risk && (
									<Pill
										style={{
											background : `${background}`,
											color      : `${color}`,
										}}
									>
										{startCase(overall_credit_risk)}
										{' '}
									</Pill>
								)}
							</div>
						</div>

						<div className={styles.flex}>
							<IcMError height={30} width={30} fill="#ff5047" />
						</div>
					</div>
				)}
			>
				{message}
			</Accordion>
		</div>
	);
}

export default OverallRisk;
