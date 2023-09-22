import { Button, Modal } from '@cogoport/components';
import {
	RadioGroupController, SelectController,
	InputController, useForm, useGetAsyncOptions, asyncFieldsLocations,
} from '@cogoport/forms';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../../../../configurations/walletForm';
import { filterOption } from '../../../../helpers/filterOptionMapping';
import useCreateRevenueDeskWallet from '../../hooks/useCreateRevenueDeskWallet';
import styles from '../../styles.module.css';

function CreateWallet({ createWallet = false, setCreateWallet = () => {}, refetch = () => {} }) {
	const [submitValue, setSubmitValue] = useState(false);

	const { createRevenueDeskWallet, loading } = useCreateRevenueDeskWallet({ setCreateWallet, refetch });

	const { handleSubmit, control, watch, formState:{ errors } } = useForm();

	const { service, trade, wallet, currency } = controls;

	const isService = watch('service_type');
	const isTrade = watch('trade_type');
	const isOrigin = watch('origin_location_id');

	const locationOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: filterOption[isService] } },
		}),
	);

	const onSubmit = (data) => {
		setSubmitValue(data);
		if (data?.wallet_amount !== undefined) createRevenueDeskWallet(data);
	};

	return (
		<Modal size="md" show={createWallet} onClose={() => setCreateWallet(!createWallet)} placement="top">
			<Modal.Header title="Automation Wallet" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.body}>
					<Modal.Body>
						<div className={styles.content}>
							<div>
								<div className={styles.label}>Select Service Type *</div>
								<SelectController
									control={control}
									{...service}
									style={{ width: '250px' }}
								/>
								<div className={styles.errors}>{errors?.service_type?.message}</div>
							</div>
							{isService && (
								<div>
									<div className={styles.label}>Select Trade Type *</div>
									<RadioGroupController control={control} {...trade} style={{ width: '250px' }} />
									<div className={styles.errors}>{errors?.trade_type?.message}</div>
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
										isClearable
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
										isClearable
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
									<div className={styles.label}>Wallet Amount *</div>
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
					</Modal.Body>
				</div>
				<Modal.Footer>
					<Button type="submit" loading={loading}>Save And Proceed</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default CreateWallet;
