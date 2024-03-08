import React, { Component } from "react";
import Webcam from "react-webcam";
// import { isAndroid, isIOS, isChrome, isSafari } from "react-device-detect";
import imageCompression from "browser-image-compression";
import Tesseract from "tesseract.js";

const videoConstraints = {
  height: 1080, //set pic resolution
  width: 1920, //set pic resolution
  facingMode: "environment" //use back Verify
  // facingMode: "user" //use front Verify
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

class Verify extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
  }

  state = {
    url: null,
    NewZipPic: null,
    URLArray: [],
    OCRText: null
  };

  componentDidMount() {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "camera" })
        .then((permissionObj) => {
          if (permissionObj.state !== "granted") {
            // Show how to grant accress right to browser
            alert("Show Alert box, teaching how to allow camera");
          }
          console.log(permissionObj.state);
        })
        .catch((error) => {
          console.log("Got error :", error);
        });
    }
  }

  bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  capturePhoto = () => {
    console.log("takePhoto");
    const imageSrc = this.webcamRef.current.getScreenshot();
    this.compressPhoto(imageSrc);
  };

  compressPhoto = (pic) => {
    //https://www.npmjs.com/package/browser-image-compression
    var options = {
      // maxSizeMB: 0.5,
      maxWidthOrHeight: 720,
      useWebWorker: true
      // fileType: "image/png"
    };

    imageCompression
      .getFilefromDataUrl(pic)
      .then((file) => imageCompression(file, options))
      .then(toBase64)
      .then((newZipPic) => {
        // console.log(pic);
        this.setState({ url: pic, NewZipPic: newZipPic }, () =>
          this.savePhoto()
        );
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  savePhoto = () => {
    var imageSrc = this.state.url;
    var newURL = this.state.NewZipPic;
    console.log(
      "Pic size before compress: " + this.bytesToSize(imageSrc.length)
    ); //size before compress
    console.log("Pic size after compress: " + this.bytesToSize(newURL.length)); //size after compress

    // Tesseract.recognize(imageSrc, "eng+chi_tra", {
    //   logger: (m) => console.log(m)
    // }).then(({ data: { text, hocr, tsv, box, unlv } }) => {
    //   // console.log(text);
    //   // console.log(hocr);
    //   // console.log(tsv);
    //   // console.log(box);
    //   // console.log(unlv);
    //   this.setState((prevState) => ({
    //     URLArray: [...prevState.URLArray, newURL],
    //     OCRText: text
    //   }));
    //   // this.setState({ OCRText: text });
    // });

    this.setState((prevState) => ({
      URLArray: [...prevState.URLArray, newURL]
    }));
  };

  selectPic = (pic) => {
    //click pic to select that pic, and remove others
    const picIndex = this.state.URLArray.indexOf(pic);
    console.log(picIndex);
    if (picIndex > -1) {
      let newURLArray = this.state.URLArray.splice(picIndex, 1);
      this.setState({ URLArray: newURLArray });
    }
  };

  tryORC = () => {
    console.log("Start OCR");
    const imageSrc = this.webcamRef.current.getScreenshot();
    Tesseract.recognize(imageSrc, "eng+ind", { // Menggunakan model bahasa Inggris dan Indonesia
      logger: (m) => console.log(m.progress),
      preserve_interword_spaces: 1, // Menjaga spasi antarkata
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", // Memperbolehkan hanya karakter tertentu
      tessedit_pageseg_mode: 1 // Mode segmentasi halaman: pilih 1 untuk mode penuh
    }).then(({ data: { text } }) => {
      this.setState({ OCRText: text });
    });
  };
  

  render() {
    return (
      <>
        <Webcam
          ref={this.webcamRef}
          audio={false}
          screenshotQuality={1}
          forceScreenshotSourceSize
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          height="400px"
          width="400px"
        />
        <button onClick={this.capturePhoto}>Capture</button>
        <button onClick={this.tryORC}>Try OCR</button>
        {this.state.URLArray.length > 0 &&
          this.state.URLArray.map((x) => (
            <div key={x}>
              <img
                src={x}
                alt="Screenshot"
                onClick={() => this.selectPic(x)}
              />
            </div>
          ))}
        {this.state.OCRText && <p>OCR Text: {this.state.OCRText}</p>} {/* Tambahkan ini */}
      </>
    );
  }
  }

export default Verify;
