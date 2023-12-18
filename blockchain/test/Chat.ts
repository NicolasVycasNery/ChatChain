import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { Chat, Chat__factory } from "../typechain-types";

describe("Chat", () => {
    let chat: Chat;
    let owner: Signer;
    let addr1: Signer;
    let addrs: Signer[];

    beforeEach(async () => {
        const ChatFactory = await ethers.getContractFactory("Chat");
        chat = (await ChatFactory.deploy()) as Chat;
        [owner, addr1, ...addrs] = await ethers.getSigners();
    });

    it("should send a message", async () => {
        await chat.send("Hello, world!");
        const message = await chat.messages(0);
        expect(message.text).to.equal("Hello, world!");
    });

    it("should count messages", async () => {
        await chat.send("Hello, world!");
        await chat.send("Hello, again!");
        const count = await chat.count();
        expect(count).to.equal(2);
    });

    it("should get messages", async () => {
        await chat.send("Hello, world!");
        await chat.send("Hello, again!");
        const messages = await chat.get(0, 2);
        expect(messages[0].text).to.equal("Hello, world!");
        expect(messages[1].text).to.equal("Hello, again!");
    });

});
