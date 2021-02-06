import React from 'react';
import ipfs from './ipfs'

//const ipfsClient = require('ipfs-http-client');
//const ipfs = ipfsClient('https://localhost:5001')

class Ipfs extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          ipfsHash: '',
          storageValue: 0,
          web3: null,
          buffer: null
        }
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

    captureFile(event) {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
    }

    onSubmit(event) {
        event.preventDefault()
        ipfs.files.add(this.state.buffer, (error, result) => {
          if(error) {
            console.error(error)
            return
          }
          /*this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
            return this.setState({ ipfsHash: result[0].hash })*/
            this.setState({ ipfsHash: result[0].hash })
            console.log('ifpsHash', this.state.ipfsHash)
          })
        //})
    }
    

    render() { 
        return (
            <div>
                <h1>Your Image</h1>
                <p>This image is stored on IPFS</p>
                <img src={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`} alt=""/>
                <h2>Upload Image</h2>
                <form onSubmit={this.onSubmit}>
                    <input type='file' onChange={this.captureFile}  />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}
 
export default Ipfs;