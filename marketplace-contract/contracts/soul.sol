// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


// deployed on Polygon Testnet: 0xEfEfc9b2B2790e30c277A4D1A2892d6142287e18
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Soulbound is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;
  event Attest(address indexed to, uint256 indexed tokenId);
  event Revoke(address indexed to, uint256 indexed tokenId);

  constructor() ERC721("Soulbound", "SLB") {}

  function safeMint(address to, string memory uri) public {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  function burn(uint256 tokenId) external {
    require(ownerOf(tokenId) == msg.sender, "Only token owner can burn it!");
    _burn(tokenId);
  }

  function revoke(uint256 tokenId) external {
    _burn(tokenId);
  }

  function _beforeTokenTransfer(
    address from,
    address to  ) internal virtual {
    require(
      from == address(0) || to == address(0),
      "You can't transfer this token."
    );
  }

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual {
    if (from == address(0)) {
      emit Attest(to, tokenId);
    } else if (to == address(0)) {
      emit Revoke(to, tokenId);
    }
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }
}