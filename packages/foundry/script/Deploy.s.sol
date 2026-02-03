// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DeployHelpers.s.sol";
import "../contracts/FlipTimer.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        // CLAWD token address on Base
        address clawdToken = 0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07;
        // Timer: 5 minutes (300 seconds)
        uint256 timerDuration = 5 minutes;

        FlipTimer game = new FlipTimer(
            clawdToken,
            timerDuration
        );

        console.logString(
            string.concat(
                "FlipTimer deployed at: ",
                vm.toString(address(game))
            )
        );

        deployments.push(Deployment("FlipTimer", address(game)));
    }
}
