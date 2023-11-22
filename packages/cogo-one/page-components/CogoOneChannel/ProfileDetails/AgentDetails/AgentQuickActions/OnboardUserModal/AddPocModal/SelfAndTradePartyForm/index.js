import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect, useImperativeHandle, forwardRef, useState } from 'react';

import AddAddtionalInfo from './AddAdditionalInfo';
import CompanyDetails from './CompanyDetails';
import PocDetails from './PocDetails';
import styles from './styles.module.css';

const PINCODE_SPLIT_INDEX = 1;
function Error(key, errors) {
	return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
}

function SelfAndTradePartyForm({
	showAdditionalDetail = false,
	setShowAdditionalDetail = () => {},
	mobileNumber = '',
	username = '',
	email = '',
	mobileCountryCode = '',
}, ref) {
	const [tradeParty, setTradeParty] = useState({});

	const {
		control,
		watch,
		resetField,
		handleSubmit,
		formState:{ errors = {} },
		setValue,
	} = useForm();

	const { trade_party_type = '', address = '' } = watch() || {};

	const onTradePartnerChange = (_, obj) => setTradeParty(obj);

	useEffect(() => {
		const selectedTradeParty = tradeParty;
		setValue('trade_party_id', selectedTradeParty?.id || '');
		setValue('business_name', selectedTradeParty?.business_name || '');

		resetField('address');
		resetField('pincode');
	}, [tradeParty, setValue, resetField]);

	useEffect(() => {
		setValue('pincode', address?.split('::')?.[PINCODE_SPLIT_INDEX]);
	}, [address, setValue]);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	return (
		<div>
			<form>
				<CompanyDetails
					onTradePartnerChange={onTradePartnerChange}
					trade_party_type={trade_party_type}
					Error={Error}
					control={control}
					errors={errors}
				/>
				POC DETAILS
				<PocDetails
					mobileNumber={mobileNumber}
					Error={Error}
					control={control}
					errors={errors}
					email={email}
					username={username}
					mobileCountryCode={mobileCountryCode}
				/>
				<div className={styles.additionDetail}>
					<Button
						size="md"
						themeType="linkUi"
						onClick={() => { setShowAdditionalDetail(!showAdditionalDetail); }}
					>
						{showAdditionalDetail ? '-hide ' : '+add '}

						additional info
					</Button>
				</div>
				{showAdditionalDetail ? (
					<AddAddtionalInfo
						Error={Error}
						control={control}
						errors={errors}
						tradeParty={tradeParty}
					/>
				) : null}

			</form>
		</div>
	);
}

export default forwardRef(SelfAndTradePartyForm);
