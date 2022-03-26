// contracts/GIF.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GIF is ERC721URIStorage {
    using Counters for Counters.Counter;

    // Anything you change, will cost you money soo try changing them as less as you can
    // String requires higher gass fees

    Counters.Counter private _tokenId;
    address contractAddress;

    // @dev --> this is how you write doc for developers on web3
    // @notice --> notice about a function
    // @param marketPlaceAddress --> declare param
    // RAM --> memory && HardDisk --> Storage

    constructor(address marketPlaceAddress) ERC721("GIF Token", "GIF") {
        contractAddress = marketPlaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        //Set new tokenID for the token
        _tokenId.increment();
        uint newTokenId = _tokenId.current();

        _mint(msg.sender, newTokenId); //Mint token
        _setTokenURI(newTokenId, tokenURI); //Generate URI
        setApprovalForAll(contractAddress, true); //Approve marketplace to sell the NFT

        return newTokenId;
    }
}
