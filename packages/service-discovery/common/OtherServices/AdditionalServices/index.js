import { Select, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetIsMobile from '../../../helpers/useGetIsMobile';

import ChangeIncoTermModal from './ChangeIncoTermModal';
import useAdditionalServices from './hooks/useAdditionalServices';
import List from './List';
import styles from './styles.module.css';

function AdditionalServices({
	rateCardData = {},
	detail = {},
	setHeaderProps = () => {},
	refetchSearch = () => {},
	source = '',
	searchLoading = false,
	refetchLoading = false,
}) {
	const {
		incoTermOptions = [],
		incoTermModalData = {},
		setIncoTermModalData = () => {},
		SERVICES_LIST_MAPPING = {},
		SERVICES_CANNOT_BE_REMOVED = [],
	} = useAdditionalServices({ rateCardData, detail, source });

	const isMobile = useGetIsMobile();

	const {
		service_details = {},
		service_type = '',
		inco_term = '',
	} = detail;

	return (
		<div>
			<div className={styles.heading}>
				You may need these services
				{source === 'checkout' && !isEmpty(incoTermOptions) ? (
					<div className={styles.inco_term_container}>
						IncoTerm:
						<Select
							value={inco_term}
							onChange={(val) => {
								if (val === inco_term) {
									Toast.error('You selected the same Incoterm');
									return;
								}

								setIncoTermModalData({ selectedValue: val });
							}}
							size="sm"
							options={incoTermOptions}
							className={styles.select}
						/>
					</div>
				) : null}
			</div>

			<div className={styles.additional_services}>
				{Object.values(SERVICES_LIST_MAPPING).map((servicesObj) => {
					const { key = '', type = '', list = [] } = servicesObj;

					if (isEmpty(list)) return null;

					return (
						<List
							key={key}
							list={list}
							type={type}
							detail={detail}
							rateCardData={rateCardData}
							setHeaderProps={setHeaderProps}
							refetch={refetchSearch}
							SERVICES_CANNOT_BE_REMOVED={SERVICES_CANNOT_BE_REMOVED}
							// startingPrices={startingPrices}
							// startingPriceLoading={startingPriceLoading}
							refetchLoading={refetchLoading}
							isMobile={isMobile}
						/>
					);
				})}
			</div>

			{!isEmpty(incoTermModalData) ? (
				<ChangeIncoTermModal
					incoTermModalData={incoTermModalData}
					setIncoTermModalData={setIncoTermModalData}
					searchLoading={searchLoading}
					getCheckout={refetchSearch}
					incoterm={inco_term}
					checkout_id={detail?.checkout_id}
					service_details={service_details}
					service_type={service_type}
				/>
			) : null}
		</div>
	);
}

export default AdditionalServices;
