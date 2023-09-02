import { Button, Modal } from '@cogoport/components';
import {
	RadioGroupController, SelectController,
	InputController, useForm, useGetAsyncOptions, asyncFieldsLocations,
} from '@cogoport/forms';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../../../../configurations';
import useCreateRevenueDeskWallet from '../../../../hooks/useCreateRevenueDeskWallet';

import styles from './styles.module.css';

function CreateWallet({ createWallet = false, setCreateWallet = () => {}, refetch = () => {} }) {
	const filterOption = {
		fcl_freight     : ['seaport'],
		lcl_freight     : ['seaport'],
		air_freight     : ['airport'],
		fcl_customs     : ['seaport'],
		lcl_customs     : ['seaport'],
		air_customs     : ['airport'],
		haulage_freight : ['pincode', 'seaport'],
		trailer_freight : ['pincode', 'seaport'],
		ltl_freight     : ['pincode', 'seaport'],
		ftl_freight     : ['pincode', 'seaport'],
		fcl_cfs         : ['seaport'],
	};

	const { createRevenueDeskWallet, loading } = useCreateRevenueDeskWallet({ setCreateWallet, refetch });

	const { handleSubmit, control, watch, formState:{ errors } } = useForm();

	const { service, trade, wallet, currency } = controls;

	const isService = watch('service_type');
	const isTrade = watch('trade_type');
	const isOrigin = watch('origin_location_id');

	console.log(isService, isTrade, 'isService');

	const locationOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: filterOption[isService] } },
		}),
	);

	const [submitValue, setSubmitValue] = useState();

	const onSubmit = (data) => {
		setSubmitValue(data);
		if (data?.wallet_amount !== undefined) createRevenueDeskWallet(data);
	};

	return (
		<Modal size="md" show={createWallet} onClose={() => setCreateWallet(!createWallet)} placement="top">
			<Modal.Header title="Automation Wallet" />
			<Modal.Body>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.content}>
						<div>
							<div className={styles.label}>Select Service Type</div>
							<SelectController
								control={control}
								{...service}
								style={{ width: '250px' }}
							/>
							<div className={styles.errors}>{errors?.service_type?.message}</div>
						</div>
						{(isService === 'fcl_freight' || isService === 'lcl_freight' || isService === 'air_freight')
					&& (
						<div>
							<div className={styles.label}>Select Trade Type</div>
							<RadioGroupController control={control} {...trade} style={{ width: '250px' }} />
						</div>
					)}
					</div>

					<div className={styles.content}>
						{isTrade && (
							<div>
								<div className={styles.label}>Select origin Location</div>
								<SelectController
									size="md"
									control={control}
									name="origin_location_id"
									{...locationOptions}
									style={{ width: '250px' }}
								/>
							</div>
						)}
						{isOrigin && (
							<div>
								<div className={styles.label}>Select Destination Location</div>
								<SelectController
									size="md"
									control={control}
									name="destination_location_id"
									style={{ width: '250px' }}
									{...locationOptions}
								/>
							</div>
						)}
					</div>

					{submitValue && (
						<div className={styles.content}>
							<div>
								<div className={styles.label}>Currency</div>
								<SelectController
									control={control}
									{...currency}
									disabled
									value="USD"
									style={{ width: '250px' }}
								/>
								<div className={styles.errors}>{errors?.currency?.message}</div>
							</div>

							<div>
								<div className={styles.label}>Wallet Amount</div>
								<InputController
									control={control}
									name="wallet_amount"
									type="number"
									placeholder="Enter Amount Here"
									{...wallet}
									style={{ width: '250px' }}
								/>
								<div className={styles.errors}>{errors?.wallet_amount?.message}</div>
							</div>
						</div>
					)}

					<div style={{ float: 'right', margin: '10px' }}>
						<Button type="submit" loading={loading}>Save And Proceed</Button>
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer />
		</Modal>
	);
}

export default CreateWallet;
