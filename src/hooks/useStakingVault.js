import { useState, useEffect, useCallback } from "react";
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
  const [minLockDays, setMinLockDays] = useState(0);
  const [maxLockDays, setMaxLockDays] = useState(365);

  useEffect(() => {
    if (!window.ethereum) {
      console.warn("MetaMask not detected");
      return;
    }

    let cancelled = false;

    const init = async () => {
      try {
        console.log("🔄 Requesting wallet connection...");
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const staking = new ethers.Contract(STAKING_CONTRACT, StakingVault?.abi || [], signer);
        const token = new ethers.Contract(TOKEN_CONTRACT, ERC20, signer);

        const min = await staking.MIN_LOCK_DAYS();
        const max = await staking.MAX_LOCK_DAYS();

        if (!cancelled) {
          setProvider(provider);
          setSigner(signer);
          setStakingContract(staking);
          setTokenContract(token);
          setAccount(address);
          setMinLockDays(Number(min));
          setMaxLockDays(Number(max));
        }

        console.log("✅ Wallet connected:", address);
        console.log("📅 Min/Max Lock Days:", { min: Number(min), max: Number(max) });
      } catch (error) {
        console.error("❌ Wallet or contract init failed:", error);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  const approveTokens = async (amount) => {
    if (!tokenContract) throw new Error("Token contract not ready");
    const decimals = await tokenContract.decimals();
    const tx = await tokenContract.approve(
      STAKING_CONTRACT,
      ethers.parseUnits(amount.toString(), decimals)
    );
    console.log("⏳ Waiting for approve tx...");
    await tx.wait();
    console.log("✅ Tokens approved");
  };

  const stakeTokens = async (amount, lockDays) => {
    if (!stakingContract || !tokenContract || !signer || !account) {
      alert("❌ Wallet not connected or contracts not ready");
      console.warn("Missing:", { stakingContract, tokenContract, signer, account });
      return;
    }

    setLoading(true);
    try {
      const parsedAmount = parseFloat(amount);
      if (
        isNaN(parsedAmount) ||
        parsedAmount <= 0 ||
        lockDays < minLockDays ||
        lockDays > maxLockDays
      ) {
        throw new Error(`Invalid lock duration. Must be between ${minLockDays} and ${maxLockDays} days.`);
      }

      await approveTokens(parsedAmount);
      console.log("📥 Staking tokens...");
      console.log("📦 Staking with values:", {
        amount: parsedAmount,
        lockDays,
        parsedAmountRaw: ethers.parseUnits(parsedAmount.toString(), 18).toString(),
      });

      const tx = await stakingContract.stake(
        ethers.parseUnits(parsedAmount.toString(), 18),
        lockDays
      );
      await tx.wait();
      console.log("✅ Staking complete");
    } catch (error) {
      console.error("❌ Stake failed:", error);
      alert(`❌ Stake failed: ${error.reason || error.message || "Unknown error"}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getApyForLockDays = async (days) => {
    if (!stakingContract) return 0;
    try {
      const apy = await stakingContract.getApyForLockDays(days);
      return Number(apy);
    } catch (err) {
      console.error("❌ Failed to fetch APY:", err);
      return 0;
    }
  };
  
  const unstake = async (index) => {
    if (!stakingContract) return;
    console.log("🔓 Unstaking...");
    const tx = await stakingContract.unstake(index);
    await tx.wait();
    console.log("✅ Unstaked");
  };

  const fetchStakes = useCallback(async () => {
    if (!account || !stakingContract) return;
    console.log("📊 Fetching stakes...");
    const userStakes = await stakingContract.getUserStakes(account);
    setStakes(userStakes);
    console.log("✅ Stakes fetched:", userStakes);
  }, [account, stakingContract]);

  const previewReward = async (amount, lockDays) => {
    if (!stakingContract) return "0.00";

    const parsedAmount = parseFloat(amount);
    if (
      isNaN(parsedAmount) ||
      parsedAmount <= 0 ||
      lockDays < minLockDays ||
      lockDays > maxLockDays
    )
      return "0.00";

    try {
      const reward = await stakingContract.previewReward(
        ethers.parseUnits(parsedAmount.toString(), 18),
        lockDays
      );
      console.log("📈 Preview reward:", ethers.formatUnits(reward, 18));
      return ethers.formatUnits(reward, 18);
    } catch (err) {
      console.error("❌ Failed to preview reward:", err);
      return "0.00";
    }
  };

  return {
    account,
    stakeTokens,
    unstake,
    fetchStakes,
    stakes,
    previewReward,
    loading,
    minLockDays,
    maxLockDays,
    getApyForLockDays,
  };
};
