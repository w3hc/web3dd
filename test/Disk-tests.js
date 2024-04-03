const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");


describe("**** Disk ****", function () {

  let Disk;
  let fileUrlStr = "https://ipfs.io/ipfs/QmcfHNjvpjXLBjEnbj985RvT9zCYkdYS4djBr9V6h7TP6i";
  let fileUrlData = ethers.utils.toUtf8Bytes(fileUrlStr);

  beforeEach(async function () {

    // Create signers
    [owner, olivier] = await ethers.getSigners();

    const contract = await ethers.getContractFactory("Disk");
    Disk = await contract.deploy();
    await Disk.deployed();
  });

  describe("* Test constantes *", function () {
    it("get version", async function () {
      expect(await Disk.version()).to.equal("1.0");
    });

    it("get mutable status", async function () {
      expect(await Disk.isImmutable()).to.equal(true);
    });

    it("get bloc size", async function () {
      expect(Number(await Disk.blocSize())).to.equal(64 * 1024);
    });

    it("get owner", async function () {
      expect(await Disk.owner()).to.equal(owner.address);
    });

  });

  describe("* Tests Directory *", function () {
    it("existDir", async function () {
      expect(await Disk.existDir("/")).to.equal(true);
      expect(await Disk.existDir("/test")).to.equal(false);
    });

    it("createDir", async function () {
      expect(await Disk.existDir("/test")).to.equal(false);
      await Disk.createDir("/","test");
      expect(await Disk.existDir("/test")).to.equal(true);
    });

    it("listDir", async function () {
      await Disk.createDir("/","test1");
      expect(await Disk.existDir("/test1")).to.equal(true);
      await Disk.createDir("/","test2");
      expect(await Disk.existDir("/test2")).to.equal(true);
      expect(await Disk.listDir("/")).deep.equal([ 'test1', 'test2' ]);
    });

    it("longListDir", async function () {
      await Disk.createDir("/","test1");
      expect(await Disk.existDir("/test1")).to.equal(true);
      await Disk.createDir("/","test2");
      expect(await Disk.existDir("/test2")).to.equal(true);
      let listDir = await Disk.longListDir("/");
      console.log("longListDir '/': ", listDir);
    });
  });

  describe("* Tests File *", function () {
    it("existFile", async function () {
      expect(await Disk.existFile("/test.txt")).to.equal(false);
    });

    it("createFile Url", async function () {
      expect(await Disk.existFile("/test.txt")).to.equal(false);
      await Disk.createFile("/","test.txt", "text/utf8",1,fileUrlData);
      expect(await Disk.existFile("/test.txt")).to.equal(true);
    });

    it("infoFile url", async function () {
      await Disk.createFile("/","test.txt", "text/utf8",1,fileUrlData);
      let fileInfo = await Disk.infoFile("/test.txt");
      console.log("fileInfo '/test.txt': ", fileInfo);
    });

    it("infoFile binary", async function () {
      await Disk.createFile("/","test.bin", "application/binary",0,Uint8Array.from(fileUrlData));
      let fileInfo = await Disk.infoFile("/test.bin");
      console.log("fileInfo '/test.bin': ", fileInfo);
    });

    it("readFile text", async function () {
      await Disk.createFile("/","test.txt", "text/utf8",1,fileUrlData);
      let fileData = await Disk.readFile("/test.txt");
      let bytesData = ethers.utils.toUtf8String(fileData);
      expect(bytesData).to.equal(fileUrlStr);
    });

    it("readFile text and binary", async function () {
      let content = fs.readFileSync(__dirname + "/robots.txt");
      //console.log(content); // return <Buffer 63 6f 6e 73 74
      await Disk.createFile("/","test.txt", "text/utf8",0,Uint8Array.from(content));
      let fileData = await Disk.readFile("/test.txt"); // 0x232068747470733a2
      //console.log(Buffer.from(fileData.substr(2) , "hex"));
      let dataRead = Buffer.from(fileData.substr(2), "hex");
      expect(dataRead.equals(Uint8Array.from(content))).to.equal(true);

      content = fs.readFileSync(__dirname + "/DiskRegistry-tests.zip");
      //console.log(content); // return <Buffer 63 6f 6e 73 74
      await Disk.createFile("/","test_zip.bin", "application/binary",0,Uint8Array.from(content));
      fileData = await Disk.readFile("/test_zip.bin"); // 0x232068747470733a2
      //console.log(Buffer.from(fileData.substr(2) , "hex"));
      dataRead = Buffer.from(fileData.substr(2), "hex");
      expect(dataRead.equals(Uint8Array.from(content))).to.equal(true);
    });
  });

  describe("* Tests gas cost *", function () {
    it("check gas cost", async function () {
      let content = Buffer.alloc(4 * 1024,'a');
      //console.log("content.length: ", Uint8Array.from(content).length);
      await Disk.createFile("/","test_4k.txt", "application/binary",0,Uint8Array.from(content), { gasLimit: 30000000 });

      // bug: 32000 = 31,199,576 / 16000 = 30,111,640 without { gasLimit: 30000000 }
      /*
      // 16K = 11818204
      content = Buffer.alloc(16 * 1024,'a');
      await Disk.createFile("/","test_16k.txt", "application/binary",0,Uint8Array.from(content), { gasLimit: 30000000 });
      */

      // 32K = 23448348
      content = Buffer.alloc(32 * 1024,'a');
      await Disk.createFile("/","test_32k.txt", "application/binary",0,Uint8Array.from(content), { gasLimit: 30000000 });
    });
  });

  describe("* Create files for manuals Tests *", function () {
    console.log("* Create files for manuals Tests *");
    let content = null;
    if (!fs.existsSync("test/test_4k.txt")) {
      content = Buffer.alloc(4 * 1024,'a');
      fs.writeFileSync("test/test_4k.txt", Uint8Array.from(content));
    }
    if (!fs.existsSync("test/test_8k.txt")) {
      content = Buffer.alloc(8 * 1024,'a');
      fs.writeFileSync("test/test_8k.txt", Uint8Array.from(content));
    }
    if (!fs.existsSync("test/test_16k.txt")) {
      content = Buffer.alloc(16 * 1024,'a');
      fs.writeFileSync("test/test_16k.txt", Uint8Array.from(content));
    }
    if (!fs.existsSync("test/test_24k.txt")) {
      content = Buffer.alloc(24 * 1024,'a');
      fs.writeFileSync("test/test_24k.txt", Uint8Array.from(content));
    }

    if (!fs.existsSync("test/test_32k.txt")) {
      content = Buffer.alloc(32 * 1024,'a');
      fs.writeFileSync("test/test_32k.txt", Uint8Array.from(content));
    }
    if (!fs.existsSync("test/test_48k.txt")) {
      content = Buffer.alloc(48 * 1024,'a');
      fs.writeFileSync("test/test_48k.txt", Uint8Array.from(content));
    }
    if (!fs.existsSync("test/test_64k.txt")) {
      content = Buffer.alloc(64 * 1024,'a');
      fs.writeFileSync("test/test_64k.txt", Uint8Array.from(content));
    }
  });
});