import { Select, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

const BUSINESS_NAME_LENGTH = 20;

interface ValueInterface {
	id?:string;
	currency?:string;
}
interface BankInterface {
	valueTradeParty: Array<ValueInterface>;
	setValueTradeParty: React.Dispatch<React.SetStateAction<ValueInterface[]>>;
	item?:{
		legal_business_name?:string;
		serial_id?:string;
		cogo_entity_id?:string;
		id?:string;
		newVal?:{ value?:string };
		currency?:string;
	}
}

function BankName({ item, valueTradeParty, setValueTradeParty }:BankInterface) {
	const {
		legal_business_name:businessName = '', serial_id:serialId = '',
		cogo_entity_id:cogoEntityId = '',
	} = item || {};

	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_cogo_entities',
	}, { manual: true });

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

	useEffect(() => {
		(async () => {
			await trigger({
				params: { filters: { id: cogoEntityId } },
			});
		})();
	}, [cogoEntityId, trigger]);
	return (
		item?.id && (
			<div className={styles.card_details}>
				<div className={styles.card_name_details}>
					<div className={styles.name_data}>
						<div>
							Name

							{businessName.length > BUSINESS_NAME_LENGTH ?	(
								<div className={styles.bold}>
									<Tooltip
										placement="top"
										content={startCase(businessName)}
										maxWidth={480}
									>
										<div className={styles.business_name_wrapper}>{startCase(businessName)}</div>
									</Tooltip>

								</div>
							) : (
								<div className={styles.bold}>
									{startCase(businessName)}
								</div>
							)}
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
