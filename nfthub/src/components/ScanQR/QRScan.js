import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
// import QRDummy from '';

const QRScan = () => {
  const [data, setData] = useState(null);
  const [formsData, setFormData] = useState({
    address: ''
  });

  const [scan, setScan] = useState(false);

  const makeRequest = async (address) => {
    try {
      // axios.post('http://localhost:3000/api/scan', {
      //   address
      // })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    } catch (error) {
      console.info("ERROR", error);
    }
  }

  const handleScan = (data) => {
    if (data) {
      setData(data?.text);
      makeRequest(data?.text);
      console.info("DATA", data?.text);
      setScan(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    makeRequest(formsData.address);
    console.info("FORM DATA", formsData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formsData,
      [e.target.name]: e.target.value
    });
  }
  return (
    <>

      <div className='container justify-content-center align-items-center mt-5'>

        {!scan ?
          <>
            <div className=''>
              {/* <div className='mx-auto border'> */}
              <center><img src={'./assets/qr_dummy.png'} alt='scan qr' className='mx-auto' /></center>
              {/* </div> */}
              <div className='d-flex justify-content-center'>
                <button className='btn btn-primary w-25 mt-5' onClick={() => setScan(true)}>Scan Your QR</button>
              </div>
              <center><p className='mt-4'>OR</p></center>
              <div className='mx-lg-0 mx-md-0 mx-2 d-flex justify-content-center'>
                <form onSubmit={handleSubmit} className='mt-4'>
                  <div className='form-group'>
                    <input type='text' name='address' value={formsData.address} onChange={handleChange} className='form-control' placeholder='Enter Address' required />
                  </div>
                  <button type='submit' className='btn btn-primary w-100 mt-3'>Submit</button>
                </form>
              </div>
            </div>
          </>
          :
          <>
            <QrReader
            onResult={(result, error) => {
              if (!!result) {
                handleScan(result);
              }

              if (!!error) {
                toast.error('Error while scanning QR code')
                console.info("ERROR", error);
              }

            }}
            className='w-50 h-75 mx-auto'
            />
            <center><button className='btn btn-primary w-25 mt-5' onClick={() => setScan(false)}>Cancel</button></center>
          </>
        }

        <h2>Address : {data}</h2><br />
      </div>



    </>
  );
}

export default QRScan
