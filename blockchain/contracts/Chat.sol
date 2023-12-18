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

    function get(uint page, uint perPage) public view returns (Message[] memory) {
        uint startIndex = page * perPage;
        uint endIndex = (page + 1) * perPage;

        if (endIndex > messages.length) {
            endIndex = messages.length;
        }

        Message[] memory result = new Message[](endIndex - startIndex);

        for (uint i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = messages[i];
        }

        return result;
    }
    
}