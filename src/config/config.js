/* configuration file */

/* network */
/* Filecoin Calibration */
import { filecoinCalibration } from '@wagmi/chains';
import { filecoinCalibration_REGISTRY_ADDR } from './calibration_RegistryAddress';
export const ETH_CHAINS = [filecoinCalibration];
export const NETWORK_ID_SYMBOL = "tFIL";
export const REGISTRY_ADDR = filecoinCalibration_REGISTRY_ADDR;

/* other */
export const SITE_NAME = 'Web3dd';
