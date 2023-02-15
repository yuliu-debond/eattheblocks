const Web3 = require('web3');
const MyContract = require('./Token.json');
const address = '0xF19fa96028BbF5A5f5e5Ec4f087173F226E77B6B';
const privateKey = 'eb1044e397960b7d725a06f6a84e90eabd4dbb0041727718d3bc1fda8f6828f2';
const infuraUrl = 'https://goerli.infura.io/v3/e437121bd4dd420798ffcd24bd77b272'; 


const amounts = [];
const values  = {
    doi: '',
    author: '',
    price: '',
    currency: '',
    coAuthors: '',
    uploadTime: '',
    sponsor: '',
    affiliation: '',
    domain: '',
    subdomain: '',
    abstract: '',
    keywords: '',
    license: '',
    filename: '',
    fileHash: '',
    fileTitle: '',
    fileType: '',
    fileFormat: '',
    reference: '',
    version: '',
    uri: '',
    dataPrice: '',
    algorithmPrice: '',
    articleInfo: [],
    displayDoi: '',
    displayPrice: '',
    displayLicense: '',
    displayAffiliation: '',
    displayDomain: '',
    displaySubDomain: '',
    displayURI: '',
    displayDataPrice: '',
    displayAlgorithmPrice: '',
    authorToken: 0,
    coAuthorToken: 0
  };

//Slightly easier (web3#sendTransaction())
const publishPaper = async (amounts, values) => {
  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    MyContract.abi,
    MyContract.networks[networkId].address
  );
  web3.eth.accounts.wallet.add(privateKey);
  const tx = myContract.methods.publishPaper(amounts, values);
  const gas = await tx.estimateGas({from: address});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  const txData = {
    from: address,
    to: myContract.options.address,
    data: data,
    gas,
    gasPrice,
    nonce, 
  };

 
  const receipt = await web3.eth.sendTransaction(txData);
}
