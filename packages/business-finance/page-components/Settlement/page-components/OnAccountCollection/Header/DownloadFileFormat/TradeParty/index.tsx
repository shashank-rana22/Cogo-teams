import { RadioGroup, Toast } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import { tradePartyOptions } from '../../../../../Constants';

import styles from './styles.module.css';

function TradeParty({ value, onChange, control, tradePartyName, valueTradeParty, setValueTradeParty }) {
	console.log(valueTradeParty, 'valueTradeParty');
	return (
		<div>
			<div className={styles.select_mode}>
				<div className={styles.text_select}>Please Select the mode for file download</div>

				<div className={styles.radio_group}>
					<RadioGroup options={tradePartyOptions} onChange={onChange} value={value} />
				</div>
			</div>

			<div className={styles.trade_party}>
				<div className={styles.trade_party_value}>Trade Party</div>
				<div className={styles.async_controller}>
					<AsyncSelectController
						control={control}
						name="tradePartyId"
						placeholder="Select Partner"
						asyncKey="list_trade_parties"
						value
						isClearable
						onChange={(val) => {
							const newData = [...valueTradeParty];
							const filterData = newData.filter((i) => i === val);
							if (filterData.length > 0) {
								Toast.info('Trade Party is already selected');
								return;
							}
							const newVal = [...valueTradeParty, val];
							setValueTradeParty(newVal);
						}}
						initialCall
						params={{
							pagination_data_required : false,
							filters                  : {
								status: 'active',
							},
						}}
					/>
				</div>
			</div>

			<div className={styles.trade_party}>
				<div className={styles.list_data}>Selected List of Trade Parties</div>
				<div className={styles.card_list_details}>
					<div className={styles.name_heading}>Name</div>
					<div className={styles.card}>
						{' '}
						{startCase(tradePartyName)}
					</div>

				</div>
			</div>
		</div>
	);
}
export default TradeParty;
