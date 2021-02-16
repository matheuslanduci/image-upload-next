import { ChangeEvent, DragEvent, useEffect, useState } from "react";

import { api } from "../services/";

type Image = {
  _id: string;
  name: string;
  date: string;
  data: string;
};

type Images = Image[];

type Response = {
  data: {
    images: Images;
  };
};

const validateFile = (file: File) => {
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/x-icon"
  ];
  if (validTypes.indexOf(file.type) === -1) {
    alert(
      "This extension is not supported. You need to choose a valid extension of image."
    );
    return false;
  }
  return true;
};

const Home = () => {
  const [image, setImage] = useState<File | null>();
  const [images, setImages] = useState<Images>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    api.get("/api/uploads").then((response: Response) => {
      setImages(response.data.images);
    });
  }, [image]);

  const handleClickOnArea = () => {
    document.querySelector<HTMLInputElement>("#image-uploader")!.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    if (file) {
      if (validateFile(file)) {
        setImage(file);
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    const file = files.item(0);

    if (file) {
      if (validateFile(file)) {
        setImage(file);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    setIsUploading(true);
    const reader = new FileReader();

    reader.addEventListener("loadend", () => {
      api
        .post("/api/upload", {
          name: image!.name,
          data: reader.result
        })
        .then(() => {
          alert("Upload successful!");
          setIsUploading(false);
          setImage(null);
        });
    });

    reader.readAsDataURL(image!);
  };

  return (
    <div className="container">
      <div className="logo">
        <span className="secondary">Image</span>
        <span className="primary">Upload</span>
      </div>
      <div
        className="upload-area"
        onClick={handleClickOnArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="53"
          height="53"
          viewBox="0 0 53 53"
        >
          <g transform="translate(-2 -2)">
            <path
              d="M52.5,22.5V33.167A5.333,5.333,0,0,1,47.167,38.5H9.833A5.333,5.333,0,0,1,4.5,33.167V22.5"
              transform="translate(0 14)"
              fill="none"
              stroke="#9b7ede"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
            />
            <path
              d="M37.167,17.833,23.833,4.5,10.5,17.833"
              transform="translate(4.667 0)"
              fill="none"
              stroke="#9b7ede"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
            />
            <path
              d="M18,4.5v32"
              transform="translate(10.5 0)"
              fill="none"
              stroke="#9b7ede"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
            />
          </g>
        </svg>
        <span>Drop files here or click to select your image</span>
      </div>
      <form className="form-hidden">
        <input type="file" id="image-uploader" onChange={handleChange} />
      </form>
      <button
        className="upload-button"
        onClick={handleSubmit}
        disabled={image ? false : true}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
      <span className="latest-images">Latest images uploaded</span>
      <div className="uploads-grid">
        {images.map(img => (
          <div className="upload" key={img._id}>
            <img src={img.data} alt={img.name} />
            <div className="info">
              <div className="name">{img.name}</div>
              <div className="date">
                Uploaded in {new Date(img.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
