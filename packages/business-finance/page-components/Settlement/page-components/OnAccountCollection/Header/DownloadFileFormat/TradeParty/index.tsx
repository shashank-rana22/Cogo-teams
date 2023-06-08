import { RadioGroup, Toast } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { TRADE_PARTY_OPTIONS } from '../../../../../Constants';

import styles from './styles.module.css';

function TradeParty({ value, onChange, control, valueTradeParty, setValueTradeParty }) {
	return (
		<div>
			<div className={styles.select_mode}>
				<div className={styles.text_select}>Please Select the mode for file download</div>

				<div className={styles.radio_group}>
					<RadioGroup options={TRADE_PARTY_OPTIONS} onChange={onChange} value={value} />
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
						valueKey="legal_business_name"
						onChange={(val, obj) => {
							const newData = [...valueTradeParty];
							const filterData = newData.filter((i) => i?.id === obj?.id);
							if (filterData.length > 0) {
								Toast.info('Trade Party Is Already Selected');
								return;
							}
							if (obj) {
								const newVal = [...valueTradeParty, obj];
								setValueTradeParty(newVal);
							}
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
						{(valueTradeParty || []).map((item) => (
							<div key={item?.id} className={styles.card_name}>
								{startCase(item?.legal_business_name)}
								{item?.id && (
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
								)}
							</div>
						)) }
					</div>

				</div>
			</div>
		</div>
	);
}
export default TradeParty;
