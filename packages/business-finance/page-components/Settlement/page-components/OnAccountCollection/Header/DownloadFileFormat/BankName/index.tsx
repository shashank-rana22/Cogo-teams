import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMDelete } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

function BankName({ item, valueTradeParty, setValueTradeParty }) {
	const {
		legal_business_name:businessName = '', serial_id:serialId = '',
		cogo_entity_id:cogoEntityId = '',
	} = item || {};

	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_cogo_entities',
	}, { manual: true });

	useEffect(() => {
		(async () => {
			await trigger({
				params: { filters: { id: cogoEntityId } },
			});
		})();
	}, [cogoEntityId, trigger]);

	const { list } = data || [{}];

	const getBankData = () => (list?.[0].bank_details || [{}]).map((itemData) => ({
		label          : `${itemData?.beneficiary_name}   ${itemData?.account_number} `,
		value          : itemData?.account_number,
		account_number : itemData?.account_number,
		account_name   : itemData?.beneficiary_name,
		id             : item?.id,
	}));

	const getCurrencyOptions = () => Object.keys(GLOBAL_CONSTANTS.currency_code).map((currency) => ({
		label : currency,
		value : currency,
		id    : item?.id,
	}));

	return (
		item?.id && (
			<div className={styles.card_details}>
				<div className={styles.card_name_details}>
					<div className={styles.name_data}>
						<div>
							Name
							{' '}
							<div className={styles.bold}>{startCase(businessName)}</div>
						</div>
						<div>
							Trade Party Serial ID
							<div className={styles.bold}>{serialId}</div>
						</div>
					</div>

					<div>
						<IcMDelete
							onClick={() => {
								const newData = [...valueTradeParty];
								const filterData = newData.filter((i) => i?.id !== item?.id);
								setValueTradeParty(filterData);
							}}
							className={styles.icon_delete}
						/>
					</div>
				</div>
				<div className={styles.bank_details}>
					<div className={styles.bank_data}>
						<div className={styles.bold}>Bank Details</div>
						{' '}
						<div className={styles.select_currency}>
							<Select
								options={getBankData()}
								value={item?.newVal?.value}
								onChange={(valData, obj) => {
									// const newValueTradeParty = [...valueTradeParty];
									// const filtered = newValueTradeParty?.filter((i) => i?.id === obj?.id);

									// if (filtered[0]) { filtered[0].bankDetails = obj?.value; }

									// setValueTradeParty(newValueTradeParty);

									setValueTradeParty((pv) => pv.map((key) => (key?.id === item?.id
										? {
											...key,
											newVal: obj,
										}
										: key)));
								}}
								placeholder="Select Bank Details"
							/>
						</div>
					</div>

					<div className={styles.currency}>
						<div className={styles.bold}>Currency</div>

						<div className={styles.select_currency}>
							<Select
								options={getCurrencyOptions()}
								value={item?.currency}
								onChange={(valData, obj) => {
									const newValueTradeParty = [...valueTradeParty];

									const filtered = newValueTradeParty?.filter((i) => i?.id === obj?.id);

									if (filtered[0]) { filtered[0].currency = valData; }

									setValueTradeParty(newValueTradeParty);
								}}
								placeholder="Select Currency"
							/>

						</div>
					</div>

				</div>
			</div>

		)
	);
}
export default BankName;
