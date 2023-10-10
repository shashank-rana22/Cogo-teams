import { Button } from '@cogoport/components';
import { IcCVerySad } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import Header from '../../common/Header';
import useDraft from '../../hooks/useDraft';
import useGetRates from '../../hooks/useGetRates';

import PersonalDetail from './PersonalDetail';
import RateCard from './RateCard';
import styles from './styles.module.css';

function Insurance() {
	const { loading, data = {}, selectedRateCard, setSelectedRateCard } = useGetRates();

	const { rateResponse = [], pocDetails = {}, ...rest	} = data || {};
	const { loading: draftLoading, submitHandler, personalDetailRef } = useDraft({ data });

	return (
		<div>
			<h2>Cargo Insurance</h2>
			<Header loading={loading} {...rest} />

			<div className={styles.container}>
				{isEmpty(rateResponse) ? (
					<div className={styles.empty_state}>
						<IcCVerySad width={70} height={70} />
						<div>
							<h2>Sorry! No rates found</h2>
							<p>Oops, this is unusual and we are working on finding rates for this route.</p>
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
							<Button loading={draftLoading} onClick={submitHandler} size="lg">Continue Purchase</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Insurance;
