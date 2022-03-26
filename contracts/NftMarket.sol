// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NftMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemId;
    Counters.Counter private _itemSold; //Track total items sold.

    address payable owner; //Payble to receieve commisions, for using your platform
    uint256 listingPrice = 0.00005 ether; //Listing fee for publishing NFT

    constructor() {
        owner = payable(msg.sender);
    }

    struct marketItem {
        uint itemId;
        uint nftId;
        address nftContract;
        address payable owner;
        address payable seller;
        uint price;
        bool sold;
    }

    mapping(uint256 => marketItem) marketIdToItem;

    event MarketItemCreated(
        uint itemId,
        uint nftId,
        address nftContract,
        address payable owner,
        address payable seller,
        uint price,
        bool sold
    );

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be greater than 0");
        require(
            msg.value == listingPrice,
            "Amount mush be equal to listing price"
        );

        _itemId.increment();
        uint256 itemId = _itemId.current();

        marketIdToItem[itemId] = marketItem(
            itemId,
            tokenId,
            nftContract,
            payable(msg.sender), // Function caller is the seller
            payable(address(0)), //Current owner, is null as it is not owned by anyone cueerntly
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            tokenId,
            nftContract,
            payable(msg.sender), // Function caller is the seller
            payable(address(0)), //Current owner, is null as it is not owned by anyone cueerntly
            price,
            false
        );
    }

    function sellMarketItem(address nftContract, uint itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = marketIdToItem[itemId].price;
        uint tokenId = marketIdToItem[itemId].nftId;

        require(msg.value == price, "Please pay correct price of the NFT");
        marketIdToItem[itemId].seller.transfer(msg.value);

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        marketIdToItem[itemId].owner = payable(msg.sender);
        marketIdToItem[itemId].sold = true;
        _itemSold.increment();
        payable(owner).transfer(listingPrice);
    }

    function fetchMarketItems() public view returns (marketItem[] memory) {
        uint itemCount = _itemId.current();
        uint unsoldItemCount = itemCount - _itemSold.current();

        marketItem[] memory items = new marketItem[](unsoldItemCount);
        uint currentIndex = 0;
        for (uint i = 0; i < itemCount; i++) {
            if (marketIdToItem[i + 1].sold == false) {
                uint currentId = marketIdToItem[i + 1].itemId;
                marketItem storage currentItem = marketIdToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (marketItem[] memory) {
        //get total number of items ever created
        uint totalItemCount = _itemId.current();

        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            //get only the items that this user has bought/is the owner
            if (marketIdToItem[i + 1].owner == msg.sender) {
                itemCount += 1; //total length
            }
        }

        marketItem[] memory items = new marketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (marketIdToItem[i + 1].owner == msg.sender) {
                uint currentId = marketIdToItem[i + 1].itemId;
                marketItem storage currentItem = marketIdToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyItemsOnSale() public view returns (marketItem[] memory) {
        //get total number of items ever created
        uint totalItemCount = _itemId.current();

        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            //get only the items that this user has bought/is the owner
            if (marketIdToItem[i + 1].owner == msg.sender) {
                itemCount += 1; //total length
            }
        }

        marketItem[] memory items = new marketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (marketIdToItem[i + 1].seller == msg.sender) {
                uint currentId = marketIdToItem[i + 1].itemId;
                marketItem storage currentItem = marketIdToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
