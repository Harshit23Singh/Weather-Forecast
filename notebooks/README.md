# Gram Mausam AI - Research & Validation Notebooks

This directory contains Jupyter research notebooks demonstrating the algorithmic foundation, physics constraints, and validation protocols for Gram Mausam AI's micro-climatic models.

## Available Notebooks

1. **`01_physics_informed_era5_downscaling.ipynb`**:
   - Ingestion of ECMWF ERA5 25km Reanalysis synoptic fields.
   - Incorporation of SRTM 30m Digital Elevation Models (DEM) and MODIS NDVI.
   - Training and validation of the Physics-Informed UNet Downscaler (PINN).
   - Evaluation of conservation of energy and adiabatic lapse rate regularizations.

2. **`02_crop_pest_vulnerability_modeling.ipynb`**:
   - Correlation analysis between thermal-humidity indices and ICAR pest occurrence data.
   - Multi-class Random Forest & Gradient Boosting pest outbreak classifiers.
   - Phenology-specific Growing Degree Days (GDD) tracking for Kharif & Rabi crops.
