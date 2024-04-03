/* configuration file */

/* network */
/* Ganache (localhost) */
/*
import { localhost } from '@wagmi/chains'; //gnosis, gnosisChiado
import { localhost_REGISTRY_ADDR } from './localhost_RegistryAddress';
export const ETH_CHAINS = [localhost];
export const NETWORK_ID_SYMBOL = "ETH";
export const REGISTRY_ADDR = localhost_REGISTRY_ADDR;
*/

/* Sepolia */
import { sepolia } from '@wagmi/chains';
import { sepolia_REGISTRY_ADDR } from './sepolia_RegistryAddress';
export const ETH_CHAINS = [sepolia];
export const NETWORK_ID_SYMBOL = "SEP";
export const REGISTRY_ADDR = sepolia_REGISTRY_ADDR;

/* Optimism Sepolia */
/*
import { optimismSepolia } from '@wagmi/chains';
import { optimismSepolia_REGISTRY_ADDR } from './optimismSepolia_RegistryAddress';
export const ETH_CHAINS = [optimismSepolia];
export const NETWORK_ID_SYMBOL = "ETH";
export const REGISTRY_ADDR = optimismSepolia_REGISTRY_ADDR;
*/

/* Filecoin Calibration */
/*
import { filecoinCalibration } from '@wagmi/chains';
import { filecoinCalibration_REGISTRY_ADDR } from './calibration_RegistryAddress';
export const ETH_CHAINS = [filecoinCalibration];
export const NETWORK_ID_SYMBOL = "tFIL";
export const REGISTRY_ADDR = filecoinCalibration_REGISTRY_ADDR;
*/

export const SITE_NAME = 'Web3dd';
