import React, { useState } from 'react';
import { Button } from '../ButtonElements';
import { InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, Img, ImgWrap } from './InfoElements';

const InfoSection = ({ handleCreateRecipiesClick, lightBg, id, imgStart, topLine, lightText, headline, darkText, description, buttonLabel, img, alt, primary, dark, dark2 }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle file change (when user selects a file)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected: ", file.name);
      setSelectedImage(file); // Set the selected image to state
    }
  };

  // Handle image upload
  const handleUploadClick = () => {
    if (selectedImage) {
      // pulkit
      handleCreateRecipiesClick(selectedImage);  // Pass the image to the parent function
    } else {
      alert("Please select an image first.");
    }
  };

  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>AI-RECIPE-GENERATOR</TopLine>
                <Heading lightText={lightText}>Kitchen Genius</Heading>
                <Subtitle darkText={darkText}>
                  Transform Your Ingredients into Tasty and Healthy Meals!
                </Subtitle>
                <BtnWrap>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Hide the file input
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload">
                    <Button as="span" primary={primary ? 1 : 0} dark={dark ? 1 : 0}>
                      Select Image
                    </Button>
                  </label>
                  <Button
                    onClick={handleUploadClick}
                    primary={primary ? 1 : 0}
                    dark={dark ? 1 : 0}
                    style={{ marginLeft: '10px' }}
                  >
                    Create Recipes
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            {/* <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2> */}
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
