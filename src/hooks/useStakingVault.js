import { useState, useEffect } from "react";
import { ethers } from "ethers";
import StakingVault from "../abis/StakingVault.json";
import ERC20 from "../abis/ERC20.json";

const STAKING_CONTRACT = "0xf9aC00a1efb05d6F62Da307c0D8E5ce6c36E0905";
const TOKEN_CONTRACT = "0x28D42ef7c9703265f20aaa952f0f179d669f07F3";

export const useStakingVault = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [stakingContract, setStakingContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [stakes, setStakes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const init = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const staking = new ethers.Contract(STAKING_CONTRACT, StakingVault.abi, signer);
        const token = new ethers.Contract(TOKEN_CONTRACT, ERC20.abi, signer);
        const address = await signer.getAddress();

        setProvider(provider);
        setSigner(signer);
        setStakingContract(staking);
        setTokenContract(token);
        setAccount(address);
      };
      init();
    }
  }, []);

  const approveTokens = async (amount) => {
    if (!tokenContract) throw new Error("Token contract not ready");
    const tx = await tokenContract.approve(STAKING_CONTRACT, ethers.parseUnits(amount.toString(), 18));
    await tx.wait();
  };

  const stakeTokens = async (amount, lockDays) => {
    if (!stakingContract || !tokenContract || !signer) {
      alert("❌ Wallet not connected or contracts not ready");
      return;
    }

    setLoading(true);
    try {
      await approveTokens(amount);
      const tx = await stakingContract.stake(ethers.parseUnits(amount.toString(), 18), lockDays);
      await tx.wait();
    } catch (error) {
      console.error("Stake failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const unstake = async (index) => {
    if (!stakingContract) return;
    const tx = await stakingContract.unstake(index);
    await tx.wait();
  };

  const fetchStakes = async () => {
    if (!account || !stakingContract) return;
    const userStakes = await stakingContract.getUserStakes(account);
    setStakes(userStakes);
  };

  const previewReward = async (amount, lockDays) => {
    if (!stakingContract) return "0.00";
    const reward = await stakingContract.previewReward(
      ethers.parseUnits(amount.toString(), 18),
      lockDays
    );
    return ethers.formatUnits(reward, 18);
  };

  return {
    account,
    stakeTokens,
    unstake,
    fetchStakes,
    stakes,
    previewReward,
    loading,
  };
};