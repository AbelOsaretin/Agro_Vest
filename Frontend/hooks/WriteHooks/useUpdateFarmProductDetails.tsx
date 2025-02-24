import { useWriteContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { useCallback } from "react";
import { parseEther } from 'viem';

const useUpdateFarmProductDetails = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;
  return useCallback(
    async (
      _index: number,
      _productName: string,
      _productImage: string,
      _productDescription: string,
      _productPrice: number,
    ) => {
      try {
        const result = writeContract({
          abi: farmAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "addFarmProduct",
          args: [
            _index,
            _productName,
            _productImage,
            _productDescription,
            parseEther(_productPrice.toString()),
          ],
        });
        return result;
      } catch (err) {
        console.error("Error updating Product details:", err);
        throw err;
      }
    },
    [writeContract]
  );
};

export default useUpdateFarmProductDetails;
