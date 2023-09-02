import { Button } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/forms';

import styles from './styles.module.css';

function Manage() {
	const {
		control,
		formState: { errors },
		handleSubmit,
		// setValue,
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (

		<form className={styles.manage_card} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.header}>
				<span className={styles.above_text}>Manage</span>
			</div>

			<div className={styles.details}>
				<div className={styles.card_content}>
					<span className={styles.above_text}>Location Name</span>
					<span className={styles.below_text}>Name must be unique</span>
				</div>
				<div className={styles.input_name}>

					<InputController
						control={control}
						name="location_name"
						size="sm"
						type="string"
						placeholder="Type Here..."
						rules={{ required: true }}
					/>
					{errors.location_name && (
						<span className={styles.error}>Location Name is Required</span>
					)}

				</div>
			</div>

			<div className={styles.details}>
				<div className={styles.card_content}>
					<span className={styles.above_text}>Add Location</span>
					<span className={styles.below_text}>Provide Latitude and Longitude</span>
				</div>
				<div className={styles.co_ord_content}>
					<div className={styles.co_ord}>
						<label htmlFor="latitude">Latitude</label>
						{/* <Input size="xl" placeholder="Type here..." {...register('latitude')} /> */}
						<InputController
							control={control}
							name="latitude"
							size="sm"
							type="number"
							placeholder="Type Here..."
							rules={{ required: true }}
						/>
						{errors.latitude && (
							<span className={styles.error}>enter co-ordinates</span>
						)}

					</div>
					<div className={styles.co_ord}>
						<label htmlFor="longitude">Longitude</label>
						{/* <Input size="xl" placeholder="Type here..." {...register('longitude')} /> */}
						<InputController
							control={control}
							name="longitude"
							size="sm"
							type="number"
							placeholder="Type Here..."
							rules={{ required: true }}
						/>
						{errors.longitude && (
							<span className={styles.error}>enter co-ordinates</span>
						)}

					</div>
				</div>
			</div>
			<div className={styles.details}>
				<div className={styles.card_content}>
					<span className={styles.above_text}>Select Permitted Radius</span>
					<span className={styles.below_text}>Radius from the latitude & longitude</span>
				</div>
				<div className={styles.input_name}>

					{/* <Input size="xl" placeholder="Type here..." {...register('radius')} /> */}
					<InputController
						control={control}
						name="radius"
						size="sm"
						type="number"
						placeholder="Type Here..."
						rules={{ required: true }}
					/>
					{errors.radius && (
						<span className={styles.error}>Radius is Required</span>
					)}

				</div>
			</div>
			<Button type="submit">Confirm and Assign</Button>
		</form>

	);
}

export default Manage;
