// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

contract FlareUtils {
    struct Checkpoint {
        uint64 fromBlock;
        uint192 amount;
    }

    /// @dev Official record of token balances for each account
    struct CheckPoints {
        uint256 numCheckPoints;
        mapping(uint256 => Checkpoint) checkPoints;
    }

    uint256 public constant BPS = 10000;

    function findCheckpoint(CheckPoints storage points, uint256 blockNumber)
        internal
        view
        returns (uint256 amount)
    {
        require(blockNumber < block.number, "future block");
        uint256 nCheckpoints = points.numCheckPoints;

        if (nCheckpoints == 0) {
            return 0;
        }

        // First check most recent balance
        if (points.checkPoints[nCheckpoints - 1].fromBlock <= blockNumber) {
            return points.checkPoints[nCheckpoints - 1].amount;
        }

        // Next check implicit zero balance
        if (points.checkPoints[0].fromBlock > blockNumber) {
            return 0;
        }

        uint256 lower = 0;
        uint256 upper = nCheckpoints - 1;
        while (upper > lower) {
            uint256 center = upper - (upper - lower) / 2; // ceil, avoiding overflow
            Checkpoint memory cp = points.checkPoints[center];
            if (cp.fromBlock == blockNumber) {
                return cp.amount;
            } else if (cp.fromBlock < blockNumber) {
                lower = center;
            } else {
                upper = center - 1;
            }
        }
        return points.checkPoints[lower].amount;
    }
}
