//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MultiUse is ERC721URIStorage{

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //owner is the contract address that created the smart contract
    address payable owner;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 listPrice = 0.01 ether;


    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        uint256 price;
        bool currentlyListed;
        bool _isSoulBound;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address payable [] owners,
        uint256 price,
        bool currentlyListed,
        bool _isSoulBound
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;
    mapping (uint256 => mapping (address => bool)) private _owners;
    mapping (uint256 => address []) private _ownersArray;

    constructor() ERC721("MultiUse", "MU") {
        owner = payable(msg.sender);
    }

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getOwnerFromId(uint256 tokenId) public view returns (address [] memory) {
        return _ownersArray[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    function changeToListed(uint tokenId) public{
        // false => Msg print and reverted
        // checking access
        require(_owners[tokenId][msg.sender], "You are not authorized!");
        require(!idToListedToken[tokenId]._isSoulBound, "SoulBound NFT can't be listed!");
        require(!idToListedToken[tokenId].currentlyListed, "NFT Already Listed!");
        require(_ownersArray[tokenId].length == 1, "NFT has multiple owners, It can't be listed!");
        // changing to true
        idToListedToken[tokenId].currentlyListed  = true;
    }

    //The first time a token is created, it is listed here
    function createToken(string memory tokenURI, uint256 price, address payable [] memory to, bool isSoulBound, bool iscurrentListed) public payable returns (uint) {
        require(isSoulBound && iscurrentListed,"It can't be listed because it is soulbound!");
        if(to.length > 1){
            require(iscurrentListed, "It can't be listed because there are multiple owners!");
        }
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        address to1 = to[0];
        _safeMint(to1, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Helper function to update Global variables and emit an event
        createListedToken(newTokenId, price,isSoulBound, iscurrentListed, to);

        return newTokenId;
    }

    function createListedToken(uint256 tokenId, uint256 price, bool isSoulBound, bool iscurrentListed, address payable [] memory to) private {
        //Make sure the sender sent enough ETH to pay for listing
        require(msg.value == listPrice, "Hopefully sending the correct price");
        //Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            price,
            iscurrentListed,
            isSoulBound
        );

        // setting up the owners
        for(uint i=0;i<to.length;i++){
            _owners[tokenId][to[i]] = true;
        }
        _ownersArray[tokenId] = to;

        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            to,
            price,
            iscurrentListed,
            isSoulBound
        );
    }


    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllListedNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            if(currentItem.currentlyListed == true){
                tokens[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }


    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }

    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(_owners[i+1][msg.sender]){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(_owners[i+1][msg.sender]) {
                currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        uint price = idToListedToken[tokenId].price;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        require(idToListedToken[tokenId].currentlyListed, "This NFT is not Listed For Sell!");
        
        
        // address seller = idToListedToken[tokenId].seller

        address payable mainOwner = payable(_ownersArray[tokenId][0]);
        // address payable mainOwner = payable(mainOw);

        //update the details of the token
        idToListedToken[tokenId].currentlyListed = true;
        idToListedToken[tokenId].seller = payable(msg.sender);
        _itemsSold.increment();

        //Actually transfer the token to the new owner
        _transfer(address(this), msg.sender, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //Transfer the listing fee to the marketplace creator
        payable(owner).transfer(listPrice);
        //Transfer the proceeds from the sale to the seller of the NFT
        payable(mainOwner).transfer(msg.value);
    }


}