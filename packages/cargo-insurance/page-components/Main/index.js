import { Button } from '@cogoport/components';
import { IcCVerySad } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import Header from '../../common/Header';
import useDraft from '../../hooks/useDraft';
import useGetRates from '../../hooks/useGetRates';

import PersonalDetail from './PersonalDetail';
import RateCard from './RateCard';
import styles from './styles.module.css';

function Insurance() {
	const { t } = useTranslation(['cargoInsurance']);

	const { loading, data = {}, selectedRateCard, setSelectedRateCard } = useGetRates();

	const { rateResponse = [], pocDetails = {}, ...rest	} = data || {};
	const { loading: draftLoading, submitHandler, personalDetailRef } = useDraft({ data });

	return (
		<div>
			<h2>{t('cargoInsurance:title')}</h2>
			<Header loading={loading} {...rest} />

			<div className={styles.container}>
				{isEmpty(rateResponse) ? (
					<div className={styles.empty_state}>
						<IcCVerySad width={70} height={70} />
						<div>
							<h2>{t('cargoInsurance:rate_empty_state_1')}</h2>
							<p>{t('cargoInsurance:rate_empty_state_2')}</p>
						</div>
					</div>
				) : (
					<>
						<div className={styles.flex_box}>
							<div className={styles.rate_card}>
								<RateCard
									data={rateResponse}
									loading={loading}
									selectedRateCard={selectedRateCard}
									setSelectedRateCard={setSelectedRateCard}
								/>
							</div>

							<div className={styles.personal_detail}>
								<PersonalDetail
									pocDetails={pocDetails}
									ref={(r) => { personalDetailRef.current = r; }}
								/>
							</div>
						</div>

						<div className={styles.footer}>
							<Button
								loading={draftLoading}
								onClick={submitHandler}
								size="lg"
							>
								{t('cargoInsurance:continue_purchase')}
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Insurance;
