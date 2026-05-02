export default function WatermarkOverlay() {
	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 9999,
				pointerEvents: 'none',
				overflow: 'hidden',
				userSelect: 'none',
			}}
		>
			<svg
				width="100%"
				height="100%"
				xmlns="http://www.w3.org/2000/svg"
				style={{ position: 'absolute', inset: 0 }}
			>
				<defs>
					<pattern
						id="wm-pattern"
						x="0"
						y="0"
						width="420"
						height="180"
						patternUnits="userSpaceOnUse"
						patternTransform="rotate(-32)"
					>
						<text
							x="10"
							y="110"
							fontFamily="Arial, sans-serif"
							fontSize="18"
							fontWeight="700"
							letterSpacing="6"
							fill="rgba(0,0,0,0.07)"
						>
							VISTA PREVIA · SIN PAGO
						</text>
						<text
							x="10"
							y="110"
							fontFamily="Arial, sans-serif"
							fontSize="18"
							fontWeight="700"
							letterSpacing="6"
							fill="none"
							stroke="rgba(255,255,255,0.07)"
							strokeWidth="0.5"
						>
							VISTA PREVIA · SIN PAGO
						</text>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#wm-pattern)" />
			</svg>
		</div>
	);
}
