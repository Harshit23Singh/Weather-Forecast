# Gram Mausam AI - Machine Learning & Meteorological Methodology

## 1. Physics-Informed Spatial Downscaling (PINN)

Coarse global meteorological numerical weather predictions (e.g. ECMWF ERA5, NOAA GFS at 25km–50km resolution) fail to capture hyper-local terrain and micro-climatic variations critical for smallholder Indian farms.

Gram Mausam AI uses a **Physics-Informed Convolutional UNet** architecture to perform spatial super-resolution from 25km down to 1km x 1km:

$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{MSE}} + \alpha_1 \mathcal{L}_{\text{lapse}} + \alpha_2 \mathcal{L}_{\text{mass}}$$

Where:
- $\mathcal{L}_{\text{MSE}}$: Ground-truth data fidelity loss.
- $\mathcal{L}_{\text{lapse}}$: Environmental temperature lapse rate regularization:
  $$\frac{\partial T}{\partial z} \approx -0.0065 \, ^\circ\text{C}/\text{m}$$
- $\mathcal{L}_{\text{mass}}$: Atmospheric column moisture conservation constraint.

---

## 2. FAO-56 Penman-Monteith Evapotranspiration ($ET_0$)

Reference evapotranspiration is calculated dynamically per the FAO-56 equation:

$$ET_0 = \frac{0.408 \Delta (R_n - G) + \gamma \frac{900}{T + 273} u_2 (e_s - e_a)}{\Delta + \gamma (1 + 0.34 u_2)}$$

- $R_n$: Net radiation at crop surface ($MJ \cdot m^{-2} \cdot day^{-1}$)
- $G$: Soil heat flux density ($MJ \cdot m^{-2} \cdot day^{-1}$)
- $T$: Mean daily air temperature at 2m height ($^\circ\text{C}$)
- $u_2$: Wind speed at 2m height ($m \cdot s^{-1}$)
- $e_s - e_a$: Saturation vapor pressure deficit ($kPa$)
- $\Delta$: Slope of the vapor pressure curve ($kPa \cdot ^\circ\text{C}^{-1}$)
- $\gamma$: Psychrometric constant ($kPa \cdot ^\circ\text{C}^{-1}$)

---

## 3. Crop Pest Vulnerability & Abiotic Stress Classification

Trained against ICAR-CRIDA (Central Research Institute for Dryland Agriculture) empirical benchmarks across major Indian Kharif and Rabi crops (Wheat, Paddy, Mustard, Cotton, Soybean, Sugarcane).
- **Growing Degree Days (GDD)** calculation for stage-specific thermal accumulation.
- **Pest vectors monitored**: Brown Plant Hopper (*Nilaparvata lugens*), Yellow Rust (*Puccinia striiformis*), Aphids (*Lipaphis erysimi*), Pink Bollworm (*Pectinophora gossypiella*).
