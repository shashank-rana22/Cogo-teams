import React from 'react';

function BookingParamsMapping({ booking_params, packages }) {
	return (
		<div>
			{(booking_params?.packages || packages)?.map((x) => (
				<div style={{ display: 'flex' }} key={x.handling_type}>
					Packages
					&nbsp;
					<div>
						{x.packages_count}
						{' '}
						pkg
						{' '}
						,
					</div>
					&nbsp;
					{x.handling_type && (
						<div>
							{x.handling_type}
							{' '}
							,
						</div>
					)}
				&nbsp;
					{x.packing_type
				&& (
					<div>
						{x.packing_type}
						{' '}
						,
					</div>
				)}
									&nbsp;
					{x.height && 			(
						<div>
							{x.height}
							{' '}
							X
						</div>
					)}
					&nbsp;
					{x.width && 	(
						<div>
							{x.width}
							{' '}
							X
						</div>
					)}
									&nbsp;
					{x.length && 	(
						<div>
							{x.length}
							{' '}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default BookingParamsMapping;
