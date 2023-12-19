// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Chat {
    struct Message {
        string text;
        address sender;
        uint timestamp;
    }

    event MessageSent(string text, address sender, uint timestamp);

    Message[] public messages;

    function send(string memory _text) public {
        messages.push(Message(_text, msg.sender, block.timestamp));
        emit MessageSent(_text, msg.sender, block.timestamp);
    }

    function count() public view returns (uint) {
        return messages.length;
    }

    function get(
        uint256 _page,
        uint256 _perPage
    ) public view returns (Message[] memory) {
        if (_page == 0 || _perPage == 0) {
            return new Message[](0); // return empty array
        }
        uint256 start = (_page - 1) * _perPage;
        uint256 end = start + _perPage;
        if (end > messages.length) {
            end = messages.length;
        }
        Message[] memory result = new Message[](end - start);
        for (uint256 i = start; i < end; i++) {
            result[i - start] = messages[i];
        }
        return result;
    }
}
